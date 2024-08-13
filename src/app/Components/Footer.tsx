'use client';

const Footer: React.FC = () => {
    return (
        <footer className="bg-black" aria-labelledby="footer-heading">
            <h2 id="footer-heading" className="sr-only">Footer</h2>
            <div>
            <div className="mx-auto max-w-7xl px-6 pb-8 pt-16 sm:pt-24 lg:px-8 lg:pt-32">
                
                <div className="xl:grid xl:grid-cols-3 xl:gap-8">
                    <div className="space-y-8">
                        <img className="h-10" src="/images/dgroomers.png" alt="Company name" />
                        <p className="text-sm leading-6 text-white">Providing the best grooming experience to your furry friend.</p>
                        <div className="flex space-x-6">
                        <a href="#" className="text-white hover:text-gray-500">
                                <span className="sr-only">YouTube</span>
                                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                                    <path fillRule="evenodd" d="M19.812 5.418c.861.23 1.538.907 1.768 1.768C21.998 8.746 22 12 22 12s0 3.255-.418 4.814a2.504 2.504 0 0 1-1.768 1.768c-1.56.419-7.814.419-7.814.419s-6.255 0-7.814-.419a2.505 2.505 0 0 1-1.768-1.768C2 15.255 2 12 2 12s0-3.255.417-4.814a2.507 2.507 0 0 1 1.768-1.768C5.744 5 11.998 5 11.998 5s6.255 0 7.814.418ZM15.194 12 10 15V9l5.194 3Z" clipRule="evenodd" />
                                </svg>
                            </a>
                            <a href="#" className="text-white hover:text-gray-500">
                                <span className="sr-only">Facebook</span>
                                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                                    <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
                                </svg>
                            </a>
                            
                           
                        </div>
                    </div>
                    <div className="mt-16 grid grid-cols-2 gap-8 xl:col-span-2 xl:mt-0">
                        <div className="md:grid md:grid-cols-2 md:gap-8">
                            <div>
                                <h3 className="text-sm font-semibold leading-6 text-white">SECTIONS</h3>
                                <ul role="list" className="mt-6 space-y-4">
                                    <li>
                                        <a href="/breeds" className="text-sm leading-6 text-white hover:text-gray-300">Breeds</a>
                                    </li>
                                   
                                </ul>
                            </div>
                            <div className="mt-10 md:mt-0">
                                <h3 className="text-sm font-semibold leading-6 text-white">ACCOUNT</h3>
                                <ul role="list" className="mt-6 space-y-4">
                                    <li>
                                        <a href="/my-account" className="text-sm leading-6 text-white hover:text-gray-300">Your Account</a>
                                    </li>
                                    <li>
                                        <a href="/my-account/my-pets" className="text-sm leading-6 text-white hover:text-gray-300">Your Pets</a>
                                    </li>
                                    <li>
                                        <a href="/my-account/schedules" className="text-sm leading-6 text-white hover:text-gray-300">Schedules</a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div className="md:grid md:grid-cols-2 md:gap-8">
                            <div>
                                <h3 className="text-sm font-semibold leading-6 text-white">SUPPORT</h3>
                                <ul role="list" className="mt-6 space-y-4">
                                    <li>
                                        <a href="/contactus" className="text-sm leading-6 text-white hover:text-gray-300">Contact Us</a>
                                    </li>
                                    <li>
                                        <a href="#" className="text-sm leading-6 text-white hover:text-gray-300">Privacy Policy</a>
                                    </li>
                                    <li>
                                        <a href="#" className="text-sm leading-6 text-white hover:text-gray-300">Terms And Conditions</a>
                                    </li>
                                </ul>
                            </div>
                            <div className="mt-10 md:mt-0">
                                <h3 className="text-sm font-semibold leading-6 text-white">COMPANY</h3>
                                <ul role="list" className="mt-6 space-y-4">
                                    <li>
                                        <a href="/about" className="text-sm leading-6 text-white hover:text-gray-300">About D_Groomers</a>
                                    </li>
                                    <li>
                                        <a href="#" className="text-sm leading-6 text-white hover:text-gray-300">Read Our Blog</a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
                </div>
                <div className="flex max-h-20 flex-col sm:flex-row justify-evenly border-t p-5  items-center border-gray-700 /10 sm:mt-20 lg:mt-24">
                    <p className="text-xs text-gray-500">&copy;Copyright © 2024 D_Groomers. All rights reserved.</p>
                    <p className="text-xs text-gray-500 mt-2 md:mt-0 underline"><a href="#">Powered By Bz</a></p>
                </div>
            </div>
            
        </footer>
    )

}
export default Footer