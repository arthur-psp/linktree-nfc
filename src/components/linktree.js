import { computed, ref } from "vue";
import { minhaLista } from "../data/restaurants";

/* Token aceito na URL: ?t=xxx (aceita também ?token=xxx) */
const TOKEN_KEYS = ['t', 'token']

const baseUrlGoogleMaps = 'https://search.google.com/local/writereview?placeid='
const baseUrlInsta = 'https://www.instagram.com/'
const baseUrlGame = 'https://reflex-game-beta.vercel.app/'

/* Valor preenchido = texto que não seja só espaços */
const isFilled = (value) => typeof value === 'string' && value.trim() !== ''

function linktreeController() {
    const searchParams = ref(new URLSearchParams())
    const openDialogConnectWifi = ref(false)
    const wifiQrCode = ref('')
    const wifiPassword = ref('')


    const getQueryParams = () => {
        searchParams.value = new URLSearchParams(window.location.search)
    }

    const token = computed(() => {
        for (const key of TOKEN_KEYS) {
            const value = searchParams.value.get(key)
            if (isFilled(value)) return value.trim()
        }
        return ''
    })

    /* Estabelecimento correspondente ao token, buscado com Array.find */
    const restaurant = computed(() => {
        if (!token.value) return null
        return minhaLista.value.find((item) => item.token === token.value) ?? null
    })

    /* Propriedades normalizadas do estabelecimento encontrado */
    const params = computed(() => ({
        googleReview: restaurant.value?.googleReview ?? '',
        menu: restaurant.value?.menu ?? '',
        instagram: restaurant.value?.instagram ?? '',
        wifiName: restaurant.value?.wifi?.nome ?? '',
        wifiPass: restaurant.value?.wifi?.senha ?? '',
    }))

    const hasGoogleReview = computed(() => isFilled(params.value.googleReview))
    const hasMenu = computed(() => isFilled(params.value.menu))
    const hasInstagram = computed(() => isFilled(params.value.instagram))
    const hasWifi = computed(() => isFilled(params.value.wifiPass))

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
    }

    const redirectToGame = () => {
      window.open(baseUrlGame, '_blank')
    }

    return {
      controller: {
        openDialogConnectWifi,
        searchParams,
        token,
        restaurant,
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
