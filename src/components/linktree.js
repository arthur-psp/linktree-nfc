import { ref } from "vue";

//localhost:5173/?gmr=ChIJuz5C44C_4pQRBfLAZ5duNEk&m=https://app.cardapioweb.com/sushi_do_adao&i=sushidoadao

function linktreeController() {
    const searchParams = ref('')
    const baseUrlGoogleMaps = 'https://search.google.com/local/writereview?placeid='
    const baseUrlInsta = 'https://www.instagram.com/'
    const openDialogConnectWifi = ref(false)
    const wifiQrCode = ref('')
    const wifiPassword = ref('')

    const getQueryParams = () => {
        const paramsString = window.location.search;
        searchParams.value = new URLSearchParams(paramsString)
    }

    const redirectToGoogleMapsReview = () => {
      if (searchParams.value.has("gmr")) {
        window.open(`${baseUrlGoogleMaps}${searchParams.value.get('gmr')}`, '_blank')
      }
    }

    const redirectToMenu = () => {
      if (searchParams.value.has("m")) {
        window.open(`${searchParams.value.get('m')}`, '_blank')
      }
    }

    const redirectToInsta = () => {
      if (searchParams.value.has("i")) {
        window.open(`${baseUrlInsta}${searchParams.value.get('i')}`, '_blank')
      }
    }

    const handleConnectToWifi = () => {
      openDialogConnectWifi.value = true

      if (searchParams.value.has("wp")) {
        const wifiName = searchParams.value.get('wn')
        const wifiPass = searchParams.value.get('wp')

        wifiQrCode.value = `WIFI:T:WPA;S:${wifiName};P:${wifiPass};;`
        wifiPassword.value = wifiPass
      } else {
        openDialogConnectWifi.value = false
      }
    }

    const copyWifiPass = async () => {
      await navigator.clipboard.writeText(wifiPassword.value)

      searchParams.value.delete('wn');
      searchParams.value.delete('wp');

      const url = new URL(window.location.href);
      url.searchParams.delete('wn')
      url.searchParams.delete('wp')
      
      window.history.replaceState(
        {},
        document.title,
        url.pathname + url.search + url.hash
      );
    }

    const redirectToGame = () => {
      window.open('https://reflex-game-beta.vercel.app/', '_blank')
    }

    return {
      controller: {
        openDialogConnectWifi,
        searchParams,
        wifiQrCode,

        getQueryParams,
        redirectToGoogleMapsReview,
        redirectToMenu,
        redirectToInsta,
        redirectToGame,
        handleConnectToWifi,
        copyWifiPass
      }
    }
}

export { linktreeController }