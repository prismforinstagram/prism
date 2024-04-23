
import { Chance } from 'chance'

export const API_URL = 'https://i.instagram.com'
export const BLOKS_VERSION_ID = '1b030ce63a06c25f3e4de6aaaf6802fe1e76401bc5ab6e5fb85ed6c2d333e0c7'

const chance = new Chance()
const deviceString = chance.string({
  pool: 'abcdef0123456789',
  length: 16,
})

export const uuid = chance.guid()
export const deviceId = `android-${deviceString}`
export const adid = chance.guid()
export const phoneId = chance.guid()

export const defaultHeaders: HeadersInit = {
	'User-Agent':
	  'Instagram 121.0.0.29.119 Android (26/8.0.0; 480dpi; 1080x1920; samsung; SM-G935F; hero2lte; samsungexynos8890; en_US; 185203708)',
	'X-Ads-Opt-Out': '0',
	'X-CM-Bandwidth-KBPS': '-1.000',
	'X-CM-Latency': '-1.000',
	'X-IG-App-Locale': 'en_US',
	'X-IG-Device-Locale': 'en_US',
	'X-Pigeon-Session-Id': Chance(
	  `'pigeon'${deviceString}${Math.round(Date.now() / 10800000)}`
	).guid(),
	'X-Pigeon-Rawclienttime': (Date.now() / 1000).toFixed(3),
	'X-IG-Connection-Speed': `1000kbps`,
	'X-IG-Bandwidth-Speed-KBPS': '-1.000',
	'X-IG-Bandwidth-TotalBytes-B': '0',
	'X-IG-Bandwidth-TotalTime-MS': '0',
	'X-IG-Extended-CDN-Thumbnail-Cache-Busting-Value': '1000',
	'X-Bloks-Version-Id': BLOKS_VERSION_ID,
	'X-IG-WWW-Claim': '0',
	'X-Bloks-Is-Layout-RTL': 'false',
	'X-IG-Connection-Type': 'WIFI',
	'X-IG-Capabilities': '3brTvwE=',
	'X-IG-App-ID': '567067343352427',
	'X-IG-Device-ID': uuid,
	'X-IG-Android-ID': deviceId,
	'Accept-Language': 'en-us',
	'X-FB-HTTP-Engine': 'Liger',
	Host: 'i.instagram.com',
	'Accept-Encoding': 'gzip',
	Connection: 'close',
  }