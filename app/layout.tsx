import Navbar from '@components/Navbar'
import Provider from '@components/Provider'
import '@styles/globals.css'

export const metadata = {
    title: "PromptVista",
    description: "Discover and share AI prompts"
}

const RootLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <html lang='en'>
            <body>
                <Provider>
                    <div className='main'>
                        <div className='gradient' />
                    </div>
                    <main className='app'>
                        <Navbar />
                        {children}
                    </main>
                </Provider>
            </body>
        </html>
    )
}

export default RootLayout