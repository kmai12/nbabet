import { Injectable } from '@angular/core';
import { HttpRequest, HttpResponse, HttpHandler, HttpEvent, HttpInterceptor, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { delay, mergeMap, materialize, dematerialize } from 'rxjs/operators';
import { Match } from '../models/match';
import { MatchResults } from '../models/matchResults';

@Injectable()
export class FakeBackendInterceptor implements HttpInterceptor {
    constructor() {}

    // todo: change username to email
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const users: any[] = JSON.parse(localStorage.getItem('users')) || [];

        // wrap in delayed observable to simulate server api call
        return of(null).pipe(mergeMap(() => {

            // Authentication //////////////////////////////////////////////////////////////
            // authenticate
            if (request.url.endsWith('/users/authenticate') && request.method === 'POST') {
                // find if any user matches login credentials
                const filteredUsers = users.filter(user => {
                    return user.email === request.body.email && user.password === request.body.password;
                });

                if (filteredUsers.length) {
                    // if login details are valid return 200 OK with user details and fake jwt token
                    const user = filteredUsers[0];
                    const body = {
                        id: user.id,
                        email: user.email,
                        firstName: user.firstName,
                        lastName: user.lastName,
                        token: 'fake-jwt-token'
                    };

                    return of(new HttpResponse({ status: 200, body: body }));
                } else {
                    // else return 400 bad request
                    return throwError({ error: { message: 'Email or password is incorrect' } });
                }
            }

            // Users //////////////////////////////////////////////////////////////
            // get users
            if (request.url.endsWith('/users') && request.method === 'GET') {
                // check for fake auth token in header and return users if valid, this security is implemented server side in a real application
                if (request.headers.get('Authorization') === 'Bearer fake-jwt-token') {
                    return of(new HttpResponse({ status: 200, body: users }));
                } else {
                    // return 401 not authorised if token is null or invalid
                    return throwError({ error: { message: 'Unauthorised' } });
                }
            }

            // // get user by id
            // if (request.url.match(/\/users\/\d+$/) && request.method === 'GET') {
            //     // check for fake auth token in header and return user if valid, this security is implemented server side in a real application
            //     if (request.headers.get('Authorization') === 'Bearer fake-jwt-token') {
            //         // find user by id in users array
            //         const urlParts = request.url.split('/');
            //         const id = parseInt(urlParts[urlParts.length - 1]);
            //         const matchedUsers = users.filter(u => u.id === id );
            //         const user = matchedUsers.length ? matchedUsers[0] : null;

            //         return of(new HttpResponse({ status: 200, body: user }));
            //     } else {
            //         // return 401 not authorised if token is null or invalid
            //         return throwError({ error: { message: 'Unauthorised' } });
            //     }
            // }

            // register user
            if (request.url.endsWith('/users/register') && request.method === 'POST') {
                // get new user object from post body
                const newUser = request.body;

                // validation
                const duplicateUser = users.filter(user => user.email === newUser.email ).length;
                if (duplicateUser) {
                    return throwError({ error: { message: 'Email "' + newUser.email + '" is already taken' } });
                }

                // save new user
                newUser.id = users.length + 1;
                users.push(newUser);
                localStorage.setItem('users', JSON.stringify(users));

                // respond 200 OK
                return of(new HttpResponse({ status: 200 }));
            }

            // // delete user
            // if (request.url.match(/\/users\/\d+$/) && request.method === 'DELETE') {
            //     // check for fake auth token in header and return user if valid, this security is implemented server side in a real application
            //     if (request.headers.get('Authorization') === 'Bearer fake-jwt-token') {
            //         // find user by id in users array
            //         const urlParts = request.url.split('/');
            //         const id = parseInt(urlParts[urlParts.length - 1]);
            //         for (let i = 0; i < users.length; i++) {
            //             const user = users[i];
            //             if (user.id === id) {
            //                 // delete user
            //                 users.splice(i, 1);
            //                 localStorage.setItem('users', JSON.stringify(users));
            //                 break;
            //             }
            //         }

            //         // respond 200 OK
            //         return of(new HttpResponse({ status: 200 }));
            //     } else {
            //         // return 401 not authorised if token is null or invalid
            //         return throwError({ error: { message: 'Unauthorised' } });
            //     }
            // }

            // Match //////////////////////////////////////////////////////////////
            const matches: Match[] = JSON.parse(localStorage.getItem('matches')) || [];

            // create match
            if (request.url.endsWith('/match/create') && request.method === 'POST') {
                // get new user object from post body
                const newMatch = request.body;

                // validation
                const duplicateMatch = matches.filter(match => match.id === newMatch.id ).length;
                if (duplicateMatch) {
                    return throwError({ error: { message: 'Match "' + newMatch.id + '" is already created' } });
                }

                // save new match
                newMatch.id = matches.length + 1;
                matches.push(newMatch);
                localStorage.setItem('matches', JSON.stringify(matches));

                // respond 200 OK
                return of(new HttpResponse({ status: 200 }));
            }

            // update match
            if (request.url.endsWith('/match/update') && request.method === 'PUT') {
                // get new user object from put body
                const updatedMatch = request.body;

                // validation
                const index = matches.findIndex(match => match.id === updatedMatch.id);

                if (index === -1) {
                    return throwError({ error: { message: 'Match "' + updatedMatch.id + '" does not exist.' } });
                }

                // update match
                matches[index] = updatedMatch;
                localStorage.setItem('matches', JSON.stringify(matches));

                // respond 200 OK
                return of(new HttpResponse({ status: 200 }));
            }

            // process match
            if (request.url.endsWith('/match/process') && request.method === 'POST') {
                // get new user object from post body
                const matchId: number = request.body;

                // validation
                const index = matches.findIndex(m => m.id === matchId);

                if (index === -1) {
                    return throwError({ error: { message: 'Match "' + matchId + '" does not exist.' } });
                }

                // process match
                const match = matches[index];
                match.results = new MatchResults(match.id, match.id, match.player1, match.player2, null, null, 'Draw');
                match.results.matchId = match.id;
                match.results.player1 = match.player1;
                match.results.player2 = match.player2;

                let state: 'P1Win' | 'P2Win' | 'Draw' = 'Draw';
                const randomNumber = Math.floor(Math.random() * Math.floor(3));

                switch (randomNumber) {
                    case 0:
                        state = 'P1Win';
                        break;
                    case 1:
                        state = 'P2Win';
                        break;
                    case 2:
                    default:
                        state = 'Draw';
                        break;
                }

                match.results.state = state;

                localStorage.setItem('matches', JSON.stringify(matches));

                // respond 200 OK
                return of(new HttpResponse({ status: 200 }));
            }

            // getall matches
            if (request.url.match(/match\/getall\/\d+/) && request.method === 'GET') {
                // check for fake auth token in header and return user if valid, this security is implemented server side in a real application
                if (request.headers.get('Authorization') !== 'Bearer fake-jwt-token') {
                    return throwError({ error: { message: 'Unauthorised' } });
                }
                // find user by id in users array
                const urlParts = request.url.split('/');
                const userId = parseInt(urlParts[urlParts.length - 1]);

                const myChallenges: Match[] = matches.filter(m => m.user1.id === userId);
                const myChallenges2: Match[] = matches.filter(m => m.user2.id === userId );

                const myMatches: Match[][] = [myChallenges, myChallenges2];

                return of(new HttpResponse({ status: 200, body: myMatches }));
            }
            // pass through any requests not handled above
            return next.handle(request);
        }))

        // call materialize and dematerialize to ensure delay even if an error is thrown (https://github.com/Reactive-Extensions/RxJS/issues/648)
        .pipe(materialize())
        .pipe(delay(500))
        .pipe(dematerialize());
    }
}

export let fakeBackendProvider = {
    // use fake backend in place of Http service for backend-less development
    provide: HTTP_INTERCEPTORS,
    useClass: FakeBackendInterceptor,
    multi: true
};


