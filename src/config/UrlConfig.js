const urlConfig = {
  authentication: {
    login: `${process.env.REACT_APP_API_ENDPOINT}/auth/login`,
    register: `${process.env.REACT_APP_API_ENDPOINT}/auth/register`,
    logout: `${process.env.REACT_APP_API_ENDPOINT}/auth/logout`,
    refreshToken: `${process.env.REACT_APP_API_ENDPOINT}/auth/refresh-token`,
    validateEmail: `${process.env.REACT_APP_API_ENDPOINT}/auth/activate`,
    google: `${process.env.REACT_APP_API_ENDPOINT}/auth/google`,
    resetPassword: `${process.env.REACT_APP_API_ENDPOINT}/auth/reset-password`
  },
  user: {
    info: `${process.env.REACT_APP_API_ENDPOINT}/users/current`,
    users: `${process.env.REACT_APP_API_ENDPOINT}/users`,
    updatePassword: `${process.env.REACT_APP_API_ENDPOINT}/users/current/password`,
    getJobRequests: `${process.env.REACT_APP_API_ENDPOINT}/users/current/job_requests`,
    searchExpert: `${process.env.REACT_APP_API_ENDPOINT}/experts`,
    promoteToArtist: `${process.env.REACT_APP_API_ENDPOINT}/users/current/promote-to-artist`,
    getTransaction: `${process.env.REACT_APP_API_ENDPOINT}/users/current/transactions`,
    getNotification: `${process.env.REACT_APP_API_ENDPOINT}/users/current/notifications`,
    updateNotification: `${process.env.REACT_APP_API_ENDPOINT}/users/current/notifications`,
    deleteUser: `${process.env.REACT_APP_API_ENDPOINT}/users`,
    getHistoryListen: `${process.env.REACT_APP_API_ENDPOINT}/users/current/history-listen`,
    likedSongs: `${process.env.REACT_APP_API_ENDPOINT}/users/current/favourite`,
    getLikedSongs: `${process.env.REACT_APP_API_ENDPOINT}/users/current/favourite`,
    getMyRequest: `${process.env.REACT_APP_API_ENDPOINT}/users/current/request`,
    followArtist: `${process.env.REACT_APP_API_ENDPOINT}/users/current/follow`,
    getFollowArtist: `${process.env.REACT_APP_API_ENDPOINT}/users/current/following`
  },
  expert: {
    current: `${process.env.REACT_APP_API_ENDPOINT}/experts/current`,
    expertUnverified: `${process.env.REACT_APP_API_ENDPOINT}/experts/unverified`,
    topExpert: `${process.env.REACT_APP_API_ENDPOINT}/experts/top`,
    expert: `${process.env.REACT_APP_API_ENDPOINT}/experts`,
    getJobRequests: `${process.env.REACT_APP_API_ENDPOINT}/experts/current/recommended-job-requests`,
    deleteJobRequests: `${process.env.REACT_APP_API_ENDPOINT}/experts/current/recommended-job-requests`,
    acceptJobRequest: `${process.env.REACT_APP_API_ENDPOINT}/experts/current/accepted-job-requests`,
    majors: `${process.env.REACT_APP_API_ENDPOINT}/experts/current/majors`,
    uploadDocuments: `${process.env.REACT_APP_API_ENDPOINT}/experts`,
    getWithdrawMethod: `${process.env.REACT_APP_API_ENDPOINT}/experts/current/bank-account`,
    updateWithdrawMethod: `${process.env.REACT_APP_API_ENDPOINT}/experts/current/bank-account`,
    getWithdrawRequest: `${process.env.REACT_APP_API_ENDPOINT}/experts/current/withdrawal-requests`
  },
  majors: {
    getMajors: `${process.env.REACT_APP_API_ENDPOINT}/majors`,
    createMajors: `${process.env.REACT_APP_API_ENDPOINT}/majors`,
    deleteMajors: `${process.env.REACT_APP_API_ENDPOINT}/majors`,
    updateMajors: `${process.env.REACT_APP_API_ENDPOINT}/majors`
  },
  job_requests: {
    getJobRequests: `${process.env.REACT_APP_API_ENDPOINT}/job_requests`,
    createJobRequests: `${process.env.REACT_APP_API_ENDPOINT}/job_requests`,
    deleteJobRequests: `${process.env.REACT_APP_API_ENDPOINT}/job_requests`,
    updateJobRequests: `${process.env.REACT_APP_API_ENDPOINT}/job_requests`,
    doneJobRequests: `${process.env.REACT_APP_API_ENDPOINT}/job_requests`,
    cancelJobRequests: `${process.env.REACT_APP_API_ENDPOINT}/job_requests`
  },
  transaction: {
    recharge: `${process.env.REACT_APP_API_ENDPOINT}/transactions/deposit`,
    createPayment: `${process.env.REACT_APP_API_ENDPOINT}/transactions/payment`,
    executePayment: `${process.env.REACT_APP_API_ENDPOINT}/transactions/payment`,
    getAll: `${process.env.REACT_APP_API_ENDPOINT}/transactions`
  },
  certificate: {
    createCertificate: `${process.env.REACT_APP_API_ENDPOINT}/certificates`,
    deleteCertificate: `${process.env.REACT_APP_API_ENDPOINT}/certificates`,
    verifyCertificate: `${process.env.REACT_APP_API_ENDPOINT}/certificates`
  },
  review: {
    createReview: `${process.env.REACT_APP_API_ENDPOINT}/reviews`
  },
  report: {
    createReport: `${process.env.REACT_APP_API_ENDPOINT}/reports`,
    getAllReport: `${process.env.REACT_APP_API_ENDPOINT}/reports`,
    getReportById: `${process.env.REACT_APP_API_ENDPOINT}/reports`,
    deleteReport: `${process.env.REACT_APP_API_ENDPOINT}/reports`
  },
  rank: {
    getDailyRank: `${process.env.REACT_APP_API_ENDPOINT}/ranking/daily`
  },
  music: {
    createMusic: `${process.env.REACT_APP_API_ENDPOINT}/songs`,
    updateMusic: `${process.env.REACT_APP_API_ENDPOINT}/songs`,
    getAllMusic: `${process.env.REACT_APP_API_ENDPOINT}/songs`,
    getMusicById: `${process.env.REACT_APP_API_ENDPOINT}/songs`,
    deleteMusic: `${process.env.REACT_APP_API_ENDPOINT}/songs`,
    justReleased: `${process.env.REACT_APP_API_ENDPOINT}/songs/release`,
    getRandom: `${process.env.REACT_APP_API_ENDPOINT}/songs/random`,
    getAllMusicByArtist: `${process.env.REACT_APP_API_ENDPOINT}/songs/artist`,
    uploadMusicByArtist: `${process.env.REACT_APP_API_ENDPOINT}/songs/upload-by-artist`,
    playSong: `${process.env.REACT_APP_API_ENDPOINT}/songs`,
    getLyricFromSong: `${process.env.REACT_APP_API_ENDPOINT}/songs/lyric`,
    addLyricToSong: `${process.env.REACT_APP_API_ENDPOINT}/songs/lyric`
  },
  keyword: {
    get5Keyword: `${process.env.REACT_APP_API_ENDPOINT}/search/keywords`,
    search: `${process.env.REACT_APP_API_ENDPOINT}/search`
  },
  genres: {
    createGenre: `${process.env.REACT_APP_API_ENDPOINT}/genres`,
    getAllGenres: `${process.env.REACT_APP_API_ENDPOINT}/genres`,
    getGenreById: `${process.env.REACT_APP_API_ENDPOINT}/genres`,
    deleteGenre: `${process.env.REACT_APP_API_ENDPOINT}/genres`,
    updateGenre: `${process.env.REACT_APP_API_ENDPOINT}/genres`
  },
  regions: {
    createRegion: `${process.env.REACT_APP_API_ENDPOINT}/regions`,
    getAllRegions: `${process.env.REACT_APP_API_ENDPOINT}/regions`,
    getRegionById: `${process.env.REACT_APP_API_ENDPOINT}/regions`,
    deleteRegion: `${process.env.REACT_APP_API_ENDPOINT}/regions`,
    updateRegion: `${process.env.REACT_APP_API_ENDPOINT}/regions`
  },
  requests: {
    createRequest: `${process.env.REACT_APP_API_ENDPOINT}/requests`,
    getAllRequests: `${process.env.REACT_APP_API_ENDPOINT}/requests`,
    getRequestById: `${process.env.REACT_APP_API_ENDPOINT}/requests`,
    deleteRequest: `${process.env.REACT_APP_API_ENDPOINT}/requests`,
    updateRequest: `${process.env.REACT_APP_API_ENDPOINT}/requests`,
    approveRequest: `${process.env.REACT_APP_API_ENDPOINT}/requests`,
    rejectRequest: `${process.env.REACT_APP_API_ENDPOINT}/requests`
  },
  playlists: {
    createPlaylist: `${process.env.REACT_APP_API_ENDPOINT}/playlists`,
    getAllPlaylists: `${process.env.REACT_APP_API_ENDPOINT}/playlists`,
    getPlaylistById: `${process.env.REACT_APP_API_ENDPOINT}/playlists`,
    deletePlaylist: `${process.env.REACT_APP_API_ENDPOINT}/playlists`,
    getAllPlaylistsByUser: `${process.env.REACT_APP_API_ENDPOINT}/playlists/current`,
    addSongToPlaylist: `${process.env.REACT_APP_API_ENDPOINT}/playlists/add-song`,
    removeSongFromPlaylist: `${process.env.REACT_APP_API_ENDPOINT}/playlists/remove-song`
  },
  albums: {
    createAlbum: `${process.env.REACT_APP_API_ENDPOINT}/albums`,
    getAllAlbums: `${process.env.REACT_APP_API_ENDPOINT}/albums`,
    getAllAlbumsByArtist: `${process.env.REACT_APP_API_ENDPOINT}/albums/artist`,
    getAlbumById: `${process.env.REACT_APP_API_ENDPOINT}/albums`,
    deleteAlbum: `${process.env.REACT_APP_API_ENDPOINT}/albums`
  },
  artists: {
    createArtist: `${process.env.REACT_APP_API_ENDPOINT}/artists`,
    getAllArtists: `${process.env.REACT_APP_API_ENDPOINT}/artists`,
    getArtistById: `${process.env.REACT_APP_API_ENDPOINT}/artists`,
    deleteArtist: `${process.env.REACT_APP_API_ENDPOINT}/artists`,
    get4Artist: `${process.env.REACT_APP_API_ENDPOINT}/artists/top-5-artist`
  },
  statistics: {
    getStatisticsAdmin: `${process.env.REACT_APP_API_ENDPOINT}/statistics/admin`,
    getStatisticsIncome: `${process.env.REACT_APP_API_ENDPOINT}/statistics/income`,
    getStatisticsExpert: `${process.env.REACT_APP_API_ENDPOINT}/statistics/current-expert`,
    getStatisticsExpertIncome: `${process.env.REACT_APP_API_ENDPOINT}/statistics/current-expert-income`
  },
  withdraw_request: {
    createWithdrawRequest: `${process.env.REACT_APP_API_ENDPOINT}/withdrawal-requests`,
    getWithdrawRequest: `${process.env.REACT_APP_API_ENDPOINT}/withdrawal-requests`,
    getAllWithdrawRequest: `${process.env.REACT_APP_API_ENDPOINT}/withdrawal-requests`,
    deleteWithdrawRequest: `${process.env.REACT_APP_API_ENDPOINT}/withdrawal-requests`,
    accepterWithdrawRequest: `${process.env.REACT_APP_API_ENDPOINT}/withdrawal-requests`
  }
}

export default urlConfig
