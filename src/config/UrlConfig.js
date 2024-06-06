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
    getFollowArtist: `${process.env.REACT_APP_API_ENDPOINT}/users/current/following`,
    buyPremium: `${process.env.REACT_APP_API_ENDPOINT}/users/premium-package`
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
    getDailyRank: `${process.env.REACT_APP_API_ENDPOINT}/ranking/daily`,
    getVietnamRank: `${process.env.REACT_APP_API_ENDPOINT}/ranking/vietnam`,
    getOtherRank: `${process.env.REACT_APP_API_ENDPOINT}/ranking/other`
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
    addLyricToSong: `${process.env.REACT_APP_API_ENDPOINT}/songs/lyric`,
    addLyricToSongByArtist: `${process.env.REACT_APP_API_ENDPOINT}/songs/artist/lyric`,
    updateMusicByArtist: `${process.env.REACT_APP_API_ENDPOINT}/songs/artist`,
    deleteMusicByArtist: `${process.env.REACT_APP_API_ENDPOINT}/songs/artist`,
    addSongToPlay: `${process.env.REACT_APP_API_ENDPOINT}/songs/next-play`
  },
  keyword: {
    get5Keyword: `${process.env.REACT_APP_API_ENDPOINT}/search/keywords`,
    search: `${process.env.REACT_APP_API_ENDPOINT}/search`,
    getRelatedKeyword: `${process.env.REACT_APP_API_ENDPOINT}/search/keywords`
  },
  genres: {
    createGenre: `${process.env.REACT_APP_API_ENDPOINT}/genres`,
    getAllGenres: `${process.env.REACT_APP_API_ENDPOINT}/genres`,
    getGenreById: `${process.env.REACT_APP_API_ENDPOINT}/genres`,
    deleteGenre: `${process.env.REACT_APP_API_ENDPOINT}/genres`,
    updateGenre: `${process.env.REACT_APP_API_ENDPOINT}/genres`
  },
  sections: {
    createSection: `${process.env.REACT_APP_API_ENDPOINT}/sections`,
    getAllSections: `${process.env.REACT_APP_API_ENDPOINT}/sections`,
    getSectionById: `${process.env.REACT_APP_API_ENDPOINT}/sections`,
    deleteSection: `${process.env.REACT_APP_API_ENDPOINT}/sections`,
    updateSection: `${process.env.REACT_APP_API_ENDPOINT}/sections`,
    getNewSection: `${process.env.REACT_APP_API_ENDPOINT}/sections/new`,
    getBannerSection: `${process.env.REACT_APP_API_ENDPOINT}/sections/banner`
  },
  premiumPackages: {
    createPremiumPackage: `${process.env.REACT_APP_API_ENDPOINT}/premium-packages`,
    getAllPremiumPackages: `${process.env.REACT_APP_API_ENDPOINT}/premium-packages`,
    getPremiumPackageById: `${process.env.REACT_APP_API_ENDPOINT}/premium-packages`,
    deletePremiumPackage: `${process.env.REACT_APP_API_ENDPOINT}/premium-packages`,
    updatePremiumPackage: `${process.env.REACT_APP_API_ENDPOINT}/premium-packages`
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
    removeSongFromPlaylist: `${process.env.REACT_APP_API_ENDPOINT}/playlists/remove-song`,
    updatePlaylist: `${process.env.REACT_APP_API_ENDPOINT}/playlists`
  },
  albums: {
    createAlbum: `${process.env.REACT_APP_API_ENDPOINT}/albums`,
    updateAlbum: `${process.env.REACT_APP_API_ENDPOINT}/albums`,
    getAllAlbums: `${process.env.REACT_APP_API_ENDPOINT}/albums`,
    getAllAlbumsByArtist: `${process.env.REACT_APP_API_ENDPOINT}/albums/artist`,
    getAlbumById: `${process.env.REACT_APP_API_ENDPOINT}/albums`,
    deleteAlbum: `${process.env.REACT_APP_API_ENDPOINT}/albums`,
    playAlbum: `${process.env.REACT_APP_API_ENDPOINT}/albums`,
    getFamousAlbums: `${process.env.REACT_APP_API_ENDPOINT}/albums/top-4-album`
  },
  artists: {
    createArtist: `${process.env.REACT_APP_API_ENDPOINT}/artists`,
    getAllArtists: `${process.env.REACT_APP_API_ENDPOINT}/artists`,
    getArtistById: `${process.env.REACT_APP_API_ENDPOINT}/artists`,
    deleteArtist: `${process.env.REACT_APP_API_ENDPOINT}/artists`,
    get4Artist: `${process.env.REACT_APP_API_ENDPOINT}/artists/top-5-artist`,
    getRelatedArtists: `${process.env.REACT_APP_API_ENDPOINT}/artists`
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
  },
  chatbot: {
    createThread: `${process.env.REACT_APP_API_ENDPOINT}/chatbot/thread`,
    chat: `${process.env.REACT_APP_API_ENDPOINT}/chatbot/message`
  },
  suggestedPlaylists: {
    getSuggestedPlaylist: `${process.env.REACT_APP_API_ENDPOINT}/suggested-playlists`,
    addToMyPlaylist: `${process.env.REACT_APP_API_ENDPOINT}/suggested-playlists`
  }
}

export default urlConfig
