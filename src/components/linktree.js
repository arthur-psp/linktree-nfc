import { computed, ref } from "vue";

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
    const client = ref({})
    const loading = ref(false)

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

    /* Propriedades do cliente vindo da planilha, normalizadas para o frontend */
    const params = computed(() => ({
        googleReview: client.value?.google_place_id ?? '',
        menu: client.value?.digital_menu ?? '',
        instagram: client.value?.instagram ?? '',
        wifiName: client.value?.wifi_name ?? '',
        wifiPass: client.value?.wifi_pass ?? '',
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

    const API = 'https://script.google.com/macros/s/AKfycbypK5O2AjvTwoYiSaZ_7W5g-IdwuYweqRU3PhVjXRtVlECyi1VEoRHrPamhPuEfR5A/exec'

    /* Busca na planilha a única linha que tem o token informado */
    const fetchClient = async (token) => {
      if (!isFilled(token)) {
        client.value = {}
        return
      }

      loading.value = true
      try {
        const res = await fetch(`${API}?token=${encodeURIComponent(token)}`)
        const data = await res.json()
        // A planilha pode devolver o objeto direto ou dentro de um array
        client.value = (Array.isArray(data) ? data[0] : data) ?? {}
      } catch (err) {
        client.value = {}
        console.log('Erro ao carregar clientes: ', err)
      } finally {
        loading.value = false
      }
    }

    return {
      controller: {
        openDialogConnectWifi,
        searchParams,
        token,
        params,
        hasGoogleReview,
        hasMenu,
        hasInstagram,
        hasWifi,
        wifiQrCode,
        client,
        loading,

        getQueryParams,
        redirectToGoogleMapsReview,
        redirectToMenu,
        redirectToInsta,
        redirectToGame,
        handleConnectToWifi,
        copyWifiPass,
        fetchClient,
      }
    }
}

export { linktreeController }
