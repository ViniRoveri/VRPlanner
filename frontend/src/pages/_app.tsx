import HeaderAndFooter from '@/components/HeaderAndFooter'
import type { AppProps } from 'next/app'
import { RecoilRoot } from 'recoil'
import '@/styles.css'
import LocalStorageDarkModeController from '@/components/LocalStorageDarkModeController'
import Router from 'next/router'
import nProgress from 'nprogress'
import AnimatedPage from '@/components/AnimatedPage'
import { useEffect } from 'react'
import ShowHomeEventsListController from '@/components/ShowHomeEventsListController'

export default function App({ Component, pageProps }: AppProps){
	useEffect(()=>{
		Router.events.on('routeChangeStart', nProgress.start)
		Router.events.on('routeChangeComplete', nProgress.done)
		Router.events.on('routeChangeError', nProgress.done)
	}, [])
	
	return (
		<RecoilRoot>
			<LocalStorageDarkModeController/>
			<ShowHomeEventsListController/>

			<HeaderAndFooter>
				<AnimatedPage>
					<Component {...pageProps} />
				</AnimatedPage>
			</HeaderAndFooter>
		</RecoilRoot>
	)
}
