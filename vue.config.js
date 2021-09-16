module.exports = {
  transpileDependencies: [
    'vuetify'
  ],
  pwa: {
    name: 'Neomedy',
    themeColor: '#4DBA87',
    msTileColor: '#000000',
    appleMobileWebAppCapable: 'yes',
    appleMobileWebAppStatusBarStyle: 'black',
    manifestOptions: {
      "icons": [
        {
          "src": "./img/icons/196.png",
          "sizes": "192x192",
          "type": "image/png"
        },
        {
          "src": "./img/icons/512.png",
          "sizes": "512x512",
          "type": "image/png"
        },
        {
          "src": "./img/icons/192.png",
          "sizes": "192x192",
          "type": "image/png",
          "purpose": "maskable"
        },
        {
          "src": "./img/icons/512.png",
          "sizes": "512x512",
          "type": "image/png",
          "purpose": "maskable"
        }
      ],
    },
    iconPaths: {
      favicon32: './icons/32.png',
      favicon16: './icons/16.png',
      appleTouchIcon: './icons/152.png',
      maskIcon: './icons/256.png',
      msTileImage: './icons/44.png'
    }
  }
}
