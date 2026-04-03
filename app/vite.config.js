export default {
  server: {
    proxy: {
      '/geoserver': {
        target: 'http://localhost:8080',
        changeOrigin: true,
      }
    }
  }
}