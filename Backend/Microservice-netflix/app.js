const path = require('path')
const express = require('express')
const cors = require('cors')
const app = express()
const dir = path.join(__dirname, 'movieCover')

const jwt = require('jsonwebtoken')
const cookieParser = require('cookie-parser')

require('dotenv').config()

app.use(cors())
app.use(express.json())
app.use(cookieParser())
app.use(express.urlencoded({ extended: true }))
app.use('/movieCover', express.static(dir))

app.get('/api/users', authenticate, (req, res) => {
	const users = [{ id: '1', login: 'Admin', password: '123' }]

	res.json(users)
})

app.post('/api/auth/login', async (req, res) => {
	const { login, password } = req.body

	console.log(`Login attempt with login: ${login} and password: ${password}`)

	if (login !== 'Admin' || password !== '123') {
		console.log('Invalid credentials')
		return res.status(401).json({ message: 'Invalid credentials' })
	}

	const accessToken = jwt.sign({ id: 1 }, process.env.TOKEN_SECRET, {
		expiresIn: '10000s',
	})

	const refreshToken = jwt.sign({ id: 1 }, process.env.REFRESH_TOKEN_SECRET, {
		expiresIn: '100000s',
	})

	console.log('Tokens generated:', { accessToken, refreshToken })
	return res.send({ accessToken, refreshToken })
})

app.post('/api/auth/refresh', async (req, res) => {
	const { refreshToken } = req.body

	if (!refreshToken) {
		return res.status(401).send({ message: 'Unauthorized' })
	}

	try {
		jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET)
	} catch (err) {
		return res.status(403).send({ message: 'Forbidden' })
	}
	const accessToken = jwt.sign({ id: 1 }, process.env.TOKEN_SECRET, {
		expiresIn: '5m',
	})

	const refreshToken1 = jwt.sign({ id: 1 }, process.env.REFRESH_TOKEN_SECRET, {
		expiresIn: '1d',
	})

	res.send({ accessToken, refreshToken1 })
})

function authenticate(req, res, next) {
	const authHeader = req.headers['authorization']
	const token = authHeader && authHeader.split(' ')[1] // Extract token from 'Bearer <token>'

	if (!token) {
		return res.status(401).send({ message: 'Unauthorized: Token missing' })
	}

	jwt.verify(token, process.env.TOKEN_SECRET, (err, user) => {
		if (err) {
			console.log('JWT Error:', err)
			return res.status(403).send({ message: 'Forbidden: Invalid token' })
		}

		req.user = user
		next()
	})
}

app.get('/movies', function (req, res, next) {
	res.json({
		orginal: [
			{
				id: 1,
				title: 'Ty',
				src: 'http://localhost:3000/movieCover/Ty.jpg',
				descriptions:
					'Błyskotliwy menadżer księgarni Joe (Penn Badgley) poznaje młodą aspirującą pisarkę Beck (Elizabeth Lail). Posługując się mediami społecznościowymi, mężczyzna zdobywa wiedzę na temat dziewczyny, by móc się do niej zbliżyć. Z czasem jego niewinne zauroczenie przeradza się w obsesję.',
			},
			{
				id: 2,
				title: 'EnolaHolmes2',
				src: 'http://localhost:3000/movieCover/EnolaHolmes2.jpg',
				descriptions:
					'Enola przyjmuje pierwszą oficjalną sprawę jako detektyw, jednak aby rozwiązać tajemnicę zaginięcia dziewczyny, będzie potrzebować pomocy przyjaciół i brata Sherlocka.',
			},
			{
				id: 3,
				title: 'Fauda',
				src: 'http://localhost:3000/movieCover/Faud.jpg',
				descriptions:
					'Akcja serialu toczy się we współczesnym Izraelu i w Palestynie na tle konfliktu izraelsko-palestyńskiego. W trakcie przesłuchania palestyńskiego członka Hamasu kapitan izraelskich służb specjalnych odkrywa, że Abu Ahmed, zwany też Panterą, terrorysta uznany za zabitego, żyje i szykuje zamac.',
			},
			{
				id: 4,
				title: 'GoodGirls`',
				src: 'http://localhost:3000/movieCover/GoodGirlL_.jpg',
				descriptions:
					'Mieszkające na przedmieściach Detroit Beth (Christina Hendricks), Annie (Mae Whitman) i Ruby (Retta) ledwo wiążą koniec z końcem. Chcąc poprawić swoją sytuację finansową, organizują napad na sklep spożywczy, w którym Annie jest kasjerką.',
			},
			{
				id: 5,
				title: 'JakSprzedawacDragiWSieci`',
				src: 'http://localhost:3000/movieCover/JakSprzedawacDragiWSieci.jpg',
				descriptions:
					'Aby odzyskać dziewczynę, nastoletni nerd zaczyna sprzedawać online ecstasy ze swojej sypialni i zostaje jednym z największych dilerów w Europie.',
			},
			{
				id: 6,
				title: 'Luther`',
				src: 'http://localhost:3000/movieCover/Luther.jpg',
				descriptions:
					'rawurowo skonstruowany psychologiczny serial kryminalny opowiadający o piekielnie inteligentnym i stroniącym od ludzi Johnie Lutherze, który jest detektywem w londyńskiej jednostce policyjnej. ',
			},
			{
				id: 7,
				title: 'Narcos`',
				src: 'http://localhost:3000/movieCover/Narcos.jpg',
				descriptions:
					'Pochodzący z Kolumbii Pablo Escobar (Wagner Moura) jest baronem narkotykowym. Oddany rodzinie mężczyzna szybko zbija fortunę na handlu kokainą.',
			},
			{
				id: 8,
				title: 'Norsemen`',
				src: 'http://localhost:3000/movieCover/Norsemen.jpg',
				descriptions:
					'Norsemen to norweski serial, który opowiada o perypetiach mieszkańców wikińskiej osady Norheim. Powstał na fali popularności tematyką kultury i historii wikingów.',
			},
		],
		rated: [
			{
				id: 9,
				title: 'Zwerbowany',
				src: 'http://localhost:3000/movieCover/Zwerbowany.jpg',
				descriptions:
					'Młody prawnik zostaje wciągnięty w niebezpieczną międzynarodową aferę szpiegowską, gdy dawna pracownica CIA grozi, że ujawni sekrety agencji.',
			},
			{
				id: 10,
				title: 'Luther`',
				src: 'http://localhost:3000/movieCover/Luther.jpg',
				descriptions:
					'rawurowo skonstruowany psychologiczny serial kryminalny opowiadający o piekielnie inteligentnym i stroniącym od ludzi Johnie Lutherze, który jest detektywem w londyńskiej jednostce policyjnej. ',
			},
			{
				id: 11,
				title: 'JakSprzedawacDragiWSieci`',
				src: 'http://localhost:3000/movieCover/JakSprzedawacDragiWSieci.jpg',
				descriptions:
					'Aby odzyskać dziewczynę, nastoletni nerd zaczyna sprzedawać online ecstasy ze swojej sypialni i zostaje jednym z największych dilerów w Europie.',
			},
			{
				id: 12,
				title: 'Obserwator',
				src: 'http://localhost:3000/movieCover/Obserwator.jpg',
				descriptions:
					'Dean i Nora Brannockowie (w serialu Bobby Cannavale i Naomi Watts) przeprowadzają się do idyllicznej dzielnicy New Jersey, gdzie szukają spokoju i bezpiecznego miejsca dla swoich dzieci.',
			},
			{
				id: 13,
				title: 'Peakty Blinders',
				src: 'http://localhost:3000/movieCover/PeakyBlinders.jpg',
				descriptions:
					'Tommy Shelby (Cillian Murphy) jest weteranem wojennym i przywódcą niesławnego gangu Peaky Blinders, zwanego tak z powodu żyletek wszytych do czapek noszonych przez jego członków.',
			},
			{
				id: 14,
				title: 'SandMan',
				src: 'http://localhost:3000/movieCover/SandMan.jpg',
				descriptions:
					'Dean i Nora Brannockowie (w serialu Bobby Cannavale i Naomi Watts) przeprowadzają się do idyllicznej dzielnicy New Jersey, gdzie szukają spokoju i bezpiecznego miejsca dla swoich dzieci.',
			},
			{
				id: 15,
				title: 'StrangerThings',
				src: 'http://localhost:3000/movieCover/StrangerThings.jpg',
				descriptions:
					'W nocy 6 listopada 1983, w Hawkins w stanie Indiana, w tajemniczych okolicznościach znika dwunastoletni Will Byers. Jego matka, Joyce, chce za wszelką cenę odnaleźć syna, część mieszkańców uważa jednak, że oszalała. ',
			},
			{
				id: 16,
				title: 'TheRain',
				src: 'http://localhost:3000/movieCover/TheRain.jpg',
				descriptions:
					'Sześć lat po tym, jak roznoszony przez deszcz wirus spustoszył Skandynawię, brat i siostra dołączają do grupy młodych ocalałych, poszukując bezpieczeństwa — i odpowiedzi.',
			},
		],
		comedy: [
			{
				id: 17,
				title: 'GoodGirls`',
				src: 'http://localhost:3000/movieCover/GoodGirlL_.jpg',
				descriptions:
					'Mieszkające na przedmieściach Detroit Beth (Christina Hendricks), Annie (Mae Whitman) i Ruby (Retta) ledwo wiążą koniec z końcem. Chcąc poprawić swoją sytuację finansową, organizują napad na sklep spożywczy, w którym Annie jest kasjerką.',
			},
			{
				id: 18,
				title: 'SamceAlfa',
				src: 'http://localhost:3000/movieCover/SamceAlfa.jpg',
				descriptions:
					'Piotrek za namową narzeczonej, zapisuje się na kurs rzucania palenia. Przez pomyłkę trafia na enigmatyczne szkolenie samorozwoju, gdzie pod wpływem charyzmatycznego coacha – Lidera, zaczyna poddawać w wątpliwość swój związek, który do tej pory uważał za idealny.',
			},
			{
				id: 19,
				title: 'NieMaJakWRodzinie',
				src: 'http://localhost:3000/movieCover/NieMaJakWRodzinie.jpg',
				descriptions:
					'Młody prawnik zostaje wciągnięty w niebezpieczną międzynarodową aferę szpiegowską, gdy dawna pracownica CIA grozi, że ujawni sekrety agencji.',
			},
			{
				id: 20,
				title: 'DobreMiejsce',
				src: 'http://localhost:3000/movieCover/DobreMiejsce.jpg',
				descriptions:
					'Młody prawnik zostaje wciągnięty w niebezpieczną międzynarodową aferę szpiegowską, gdy dawna pracownica CIA grozi, że ujawni sekrety agencji.',
			},
			{
				id: 21,
				title: 'SexEducation',
				src: 'http://localhost:3000/movieCover/SexEducation.jpg',
				descriptions:
					'Młody prawnik zostaje wciągnięty w niebezpieczną międzynarodową aferę szpiegowską, gdy dawna pracownica CIA grozi, że ujawni sekrety agencji.',
			},
			{
				id: 22,
				title: 'Atypowy',
				src: 'http://localhost:3000/movieCover/Atypowy.jpg',
				descriptions:
					'Młody prawnik zostaje wciągnięty w niebezpieczną międzynarodową aferę szpiegowską, gdy dawna pracownica CIA grozi, że ujawni sekrety agencji.',
			},
			{
				id: 23,
				title: 'GinnyAndGorgia',
				src: 'http://localhost:3000/movieCover/GinnyAndGorgia.jpg',
				descriptions:
					'Młody prawnik zostaje wciągnięty w niebezpieczną międzynarodową aferę szpiegowską, gdy dawna pracownica CIA grozi, że ujawni sekrety agencji.',
			},
			{
				id: 24,
				title: 'ParadisePD',
				src: 'http://localhost:3000/movieCover/ParadisePD.jpg',
				descriptions:
					'Młody prawnik zostaje wciągnięty w niebezpieczną międzynarodową aferę szpiegowską, gdy dawna pracownica CIA grozi, że ujawni sekrety agencji.',
			},
		],
		horror: [
			{
				id: 25,
				title: '1899',
				src: 'http://localhost:3000/movieCover/1899.jpg',
				descriptions:
					'1899 rok. Parowiec z emigrantami bierze kurs na zachód. Pasażerowie pochodzą z różnych części Europy, ale łączą ich wspólne marzenia i nadzieja na lepszą przyszłość w nowym świecie.',
			},
			{
				id: 26,
				title: 'MamyTuDucha',
				src: 'http://localhost:3000/movieCover/MamyTuDucha.jpg',
				descriptions:
					'1899 rok. Parowiec z emigrantami bierze kurs na zachód. Pasażerowie pochodzą z różnych części Europy, ale łączą ich wspólne marzenia i nadzieja na lepszą przyszłość w nowym świecie.',
			},
			{
				id: 27,
				title: 'Opiekunka',
				src: 'http://localhost:3000/movieCover/Opiekunka.jpg',
				descriptions:
					'1899 rok. Parowiec z emigrantami bierze kurs na zachód. Pasażerowie pochodzą z różnych części Europy, ale łączą ich wspólne marzenia i nadzieja na lepszą przyszłość w nowym świecie.',
			},
			{
				id: 28,
				title: 'Rytual',
				src: 'http://localhost:3000/movieCover/Rytual.jpg',
				descriptions:
					'1899 rok. Parowiec z emigrantami bierze kurs na zachód. Pasażerowie pochodzą z różnych części Europy, ale łączą ich wspólne marzenia i nadzieja na lepszą przyszłość w nowym świecie.',
			},
			{
				id: 29,
				title: 'Cisza',
				src: 'http://localhost:3000/movieCover/Cisza.jpg',
				descriptions:
					'1899 rok. Parowiec z emigrantami bierze kurs na zachód. Pasażerowie pochodzą z różnych części Europy, ale łączą ich wspólne marzenia i nadzieja na lepszą przyszłość w nowym świecie.',
			},
			{
				id: 30,
				title: 'CoWidacISlychac',
				src: 'http://localhost:3000/movieCover/CoWidacISlychac.jpg',
				descriptions:
					'1899 rok. Parowiec z emigrantami bierze kurs na zachód. Pasażerowie pochodzą z różnych części Europy, ale łączą ich wspólne marzenia i nadzieja na lepszą przyszłość w nowym świecie.',
			},
			{
				id: 31,
				title: 'Ladunek',
				src: 'http://localhost:3000/movieCover/Ladunek.jpg',
				descriptions:
					'1899 rok. Parowiec z emigrantami bierze kurs na zachód. Pasażerowie pochodzą z różnych części Europy, ale łączą ich wspólne marzenia i nadzieja na lepszą przyszłość w nowym świecie.',
			},
			{
				id: 32,
				title: 'Clinical',
				src: 'http://localhost:3000/movieCover/Clinical.jpg',
				descriptions:
					'1899 rok. Parowiec z emigrantami bierze kurs na zachód. Pasażerowie pochodzą z różnych części Europy, ale łączą ich wspólne marzenia i nadzieja na lepszą przyszłość w nowym świecie.',
			},
		],
		action: [
			{
				id: 33,
				title: 'Peakty Blinders',
				src: 'http://localhost:3000/movieCover/PeakyBlinders.jpg',
				descriptions:
					'Tommy Shelby (Cillian Murphy) jest weteranem wojennym i przywódcą niesławnego gangu Peaky Blinders, zwanego tak z powodu żyletek wszytych do czapek noszonych przez jego członków.',
			},
			{
				id: 34,
				title: 'Wiedzmin',
				src: 'http://localhost:3000/movieCover/Wiedzmin.jpg',
				descriptions:
					'Wiedźmin to epicka opowieść na podstawie kultowej sagi fantasy Andrzeja Sapkowskiego. Geralt z Rivii, samotny zabójca potworów, usiłuje odnaleźć się w świecie, w którym ludzie bywają gorsi niż bestie, na które poluje.',
			},
			{
				id: 35,
				title: 'GinnyAndGorgia',
				src: 'http://localhost:3000/movieCover/GinnyAndGorgia.jpg',
				descriptions:
					'Młody prawnik zostaje wciągnięty w niebezpieczną międzynarodową aferę szpiegowską, gdy dawna pracownica CIA grozi, że ujawni sekrety agencji.',
			},
			{
				id: 36,
				title: 'SamceAlfa',
				src: 'http://localhost:3000/movieCover/SamceAlfa.jpg',
				descriptions:
					'Piotrek za namową narzeczonej, zapisuje się na kurs rzucania palenia. Przez pomyłkę trafia na enigmatyczne szkolenie samorozwoju, gdzie pod wpływem charyzmatycznego coacha – Lidera, zaczyna poddawać w wątpliwość swój związek, który do tej pory uważał za idealny.',
			},
			{
				id: 37,
				title: 'SandMan',
				src: 'http://localhost:3000/movieCover/SandMan.jpg',
				descriptions:
					'Dean i Nora Brannockowie (w serialu Bobby Cannavale i Naomi Watts) przeprowadzają się do idyllicznej dzielnicy New Jersey, gdzie szukają spokoju i bezpiecznego miejsca dla swoich dzieci.',
			},
			{
				id: 38,
				title: 'StrangerThings',
				src: 'http://localhost:3000/movieCover/StrangerThings.jpg',
				descriptions:
					'W nocy 6 listopada 1983, w Hawkins w stanie Indiana, w tajemniczych okolicznościach znika dwunastoletni Will Byers. Jego matka, Joyce, chce za wszelką cenę odnaleźć syna, część mieszkańców uważa jednak, że oszalała. ',
			},
			{
				id: 39,
				title: 'EnolaHolmes2',
				src: 'http://localhost:3000/movieCover/EnolaHolmes2.jpg',
				descriptions:
					'Enola przyjmuje pierwszą oficjalną sprawę jako detektyw, jednak aby rozwiązać tajemnicę zaginięcia dziewczyny, będzie potrzebować pomocy przyjaciół i brata Sherlocka.',
			},
			{
				id: 40,
				title: 'Zwerbowany',
				src: 'http://localhost:3000/movieCover/Zwerbowany.jpg',
				descriptions:
					'Młody prawnik zostaje wciągnięty w niebezpieczną międzynarodową aferę szpiegowską, gdy dawna pracownica CIA grozi, że ujawni sekrety agencji.',
			},
		],
	})
})
app.get('/img', function (req, res, next) {
	res.json({ img: ['img2', 'img1'] })
})

app.listen(3000, function () {
	console.log('Server start on port 3000')
})
