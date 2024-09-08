import React from 'react'
import Image from 'next/image'
import { ContainerScroll } from '../../components/ui/container-scroll-animation';
import appOverview from './../../../assets/FinancleFinanceSS.png';
export default function Hero() {



    return (
        <section className='bg-white flex items-center flex-col'>
            <div className='flex flex-col overflow-hidden'>
                <ContainerScroll
                    titleComponent={
                        <>
                            <h1 className="text-4xl font-semibold text-black dark:text-white mb-8">
                                Track your finances with ease, leverage the<br />
                                    <span className="text-4xl md:text-[5rem] font-bold mt-1 leading-none">
                                    Finacle Finance Tracker
                                </span>
                            </h1>
                        </>
                    }
                >
                    <Image
                        src={appOverview}
                        alt="hero"
                        height={720}
                        width={1400}
                        className="mx-auto rounded-2xl object-cover h-full object-left-top"
                        draggable={false}
                    />
                </ContainerScroll>
            </div>
        </section>

    )
}
