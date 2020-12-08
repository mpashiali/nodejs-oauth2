var model = {
    oauth_access_tokens: [],
    oauth_clients: [{
        client_id: 'application',
        secret_id: 'secret',
        redirect_uri: [],
        grants: [
            'password',
            'refresh_token',
            'client_credentials'
        ]
    }],
    oauth_refresh_tokens: [],
    users: [{
        user_id: 'userid',
        username: 'serious_business',
        password: 'suchPassw0rdSecure'
    }]
}

export function getClient(clientId) {

    var client = model.oauth_clients.filter(function (client) {
        return client.client_id === clientId;
    });

    if (!client) {
        console.log('No client found');
        return null;
    }
    return client[0];
}

export function getUser(username) {

    var user = model.users.filter(function (user) {
        return user.username === username;
    });

    if (!user) {
        console.log('No user found');
        return null;
    }
    return user[0];
}

export function getAccessToken(token) {

    var tok = model.oauth_access_tokens.filter(function (tokens) {
        return tokens.accessToken === token;
    });
    if (!tok) {
        console.log('No acess token found');
        return null;
    }
    return tok[0];
}
export function saveToken(token, client, user) {

    var newToken = {
        accessToken: token.accessToken,
        accessTokenExpiresAt: token.accessTokenExpiresAt,
        clientId: client.client_id,
        refreshToken: token.refreshToken,
        refreshTokenExpiresAt: token.refreshTokenExpiresAt,
        userId: user.user_id,
        client: client,
        user: user,
        scope: null
    };

    model.oauth_access_tokens.push(newToken);

    var newRefreshToken = {
        refresh_token: token.refreshToken,
        expires_at: token.refreshTokenExpiresAt,
        scope: token.scope,
        client: client.client_id,
        user: user.user_id
    };

    model.oauth_refresh_tokens.push(newRefreshToken);

    return newToken;
}
