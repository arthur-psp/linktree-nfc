import { computed, ref } from "vue";

/* Parâmetros aceitos na query da URL e o link que cada um habilita */
const PARAM_KEYS = {
    googleReview: 'gmr',
    menu: 'm',
    instagram: 'i',
    wifiName: 'wn',
    wifiPass: 'wp',
}

const baseUrlGoogleMaps = 'https://search.google.com/local/writereview?placeid='
const baseUrlInsta = 'https://www.instagram.com/'
const baseUrlGame = 'https://reflex-game-beta.vercel.app/'

function linktreeController() {
    const searchParams = ref(new URLSearchParams())
    const openDialogConnectWifi = ref(false)
    const wifiQrCode = ref('')
    const wifiPassword = ref('')

    /* Valor bruto do parâmetro ('' quando ausente) */
    const readParam = (key) => searchParams.value.get(key) ?? ''

    /* Parâmetro válido = existe na query E tem valor (não apenas espaços) */
    const hasParam = (key) => readParam(key).trim() !== ''

    const getQueryParams = () => {
        const paramsString = window.location.search;
        searchParams.value = new URLSearchParams(paramsString)
    }

    /* Presença e valor de cada parâmetro da URL (reativo) */
    const params = computed(() => ({
        googleReview: readParam(PARAM_KEYS.googleReview),
        menu: readParam(PARAM_KEYS.menu),
        instagram: readParam(PARAM_KEYS.instagram),
        wifiName: readParam(PARAM_KEYS.wifiName),
        wifiPass: readParam(PARAM_KEYS.wifiPass),
    }))

    const hasGoogleReview = computed(() => hasParam(PARAM_KEYS.googleReview))
    const hasMenu = computed(() => hasParam(PARAM_KEYS.menu))
    const hasInstagram = computed(() => hasParam(PARAM_KEYS.instagram))
    const hasWifi = computed(() => hasParam(PARAM_KEYS.wifiPass))

    const redirectToGoogleMapsReview = () => {
      if (hasGoogleReview.value) {
        window.open(`${baseUrlGoogleMaps}${params.value.googleReview}`, '_blank')
      }
    }

    const redirectToMenu = () => {
      if (hasMenu.value) {
        window.open(`${params.value.menu}`, '_blank')
      }
    }

    const redirectToInsta = () => {
      if (hasInstagram.value) {
        window.open(`${baseUrlInsta}${params.value.instagram}`, '_blank')
      }
    }

    const handleConnectToWifi = () => {
      if (!hasWifi.value) return

      openDialogConnectWifi.value = true
      wifiQrCode.value = `WIFI:T:WPA;S:${params.value.wifiName};P:${params.value.wifiPass};;`
      wifiPassword.value = params.value.wifiPass
    }

    const copyWifiPass = async () => {
      await navigator.clipboard.writeText(wifiPassword.value)

      const url = new URL(window.location.href);
      url.searchParams.delete(PARAM_KEYS.wifiName)
      url.searchParams.delete(PARAM_KEYS.wifiPass)

      window.history.replaceState(
        {},
        document.title,
        url.pathname + url.search + url.hash
      );

      /* Re-sincroniza o estado com a URL: sem wn/wp o botão de Wi-Fi sai do DOM */
      getQueryParams()
    }

    const redirectToGame = () => {
      window.open(baseUrlGame, '_blank')
    }

    return {
      controller: {
        openDialogConnectWifi,
        searchParams,
        params,
        hasGoogleReview,
        hasMenu,
        hasInstagram,
        hasWifi,
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
