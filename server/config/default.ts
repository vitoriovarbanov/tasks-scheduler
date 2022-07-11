export default {
    port: 1337,
    dbUri: "mongodb://localhost:27017/tasks-scheduler",
    saltWorkFactor: 10,
    accessTokenTtl: '15m',
    refreshTokenTtl: '1y',
    publicKey: `-----BEGIN PUBLIC KEY-----
MFswDQYJKoZIhvcNAQEBBQADSgAwRwJAZ/uHqqwqLf6DtVuWzJLCEjDlvwjCtu0D
JpBB00FEZ1L/rVqNsxuTJFOM2tnCuuHFfYXVNgmg5pvBmWbemRY6CwIDAQAB
-----END PUBLIC KEY-----`,
    privateKey: `-----BEGIN RSA PRIVATE KEY-----
MIIBOAIBAAJAZ/uHqqwqLf6DtVuWzJLCEjDlvwjCtu0DJpBB00FEZ1L/rVqNsxuT
JFOM2tnCuuHFfYXVNgmg5pvBmWbemRY6CwIDAQABAkBLTk/vnCYkD0qFwqIQ4Exq
7jzFQGv8HOSGPj1d6MvIY9hjy/FHKiis5h+ff9PqKqr2OMPLrHr3Bwie8c+/nVyB
AiEAptC9IYXUwU2aWs8Tp6oWiIJDykJbHqlmIQu0OoO4rcsCIQCfkyVZIZdx+KU0
JsyTbk5pZMJ+OR+uR/bn8Fyq3GscwQIgWaxQX1rwGdG7riEvMaxPXKaaBnpRPVRW
4GDIS8RPXK0CIH0BvKRSWF2EN4bfTivAodSWhnZzMYpJ/fY8qZuACLkBAiAegwrM
lJdXYP7ndem7ZjBfCW5I01mbJmLoR5uaOOqi2A==
-----END RSA PRIVATE KEY-----`
};