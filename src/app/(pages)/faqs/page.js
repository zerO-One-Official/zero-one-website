"use client"
import { useState } from 'react';
import { BsChevronRight } from 'react-icons/bs';
import styles from '@/styles/faq.module.css';
import useSWR from 'swr'
import Spinner from '@/components/loader/Spinner';
import toast from 'react-hot-toast'

function FAQs() {


    const fetcher = url => fetch(url).then(r => r.json());

    const { data, error, isLoading } = useSWR('/api/faqs', fetcher);

    const [activeIndex, setActiveIndex] = useState(null);

    const toggleFAQ = (index) => {
        if (activeIndex == index) setActiveIndex(null);
        else setActiveIndex(index)
    }
    if (error) return toast.error(error.message);

    return (
        <section className="container-70 pt-16 sm:pt-8 sm:w-4/5 xs:w-[85%]">
            <div className="mt-6 mb-20 sm:mt-8 sm:mb-20 xs:mt-4 xs:mb-16">
                <h1 className="text-6xl xl:text-5xl xl:leading-snug sm:text-4xl text-center">
                    Frequently Asked Question (FAQs) 🤔
                </h1>
            </div>
            <div className="grid gap-4 sm:gap-2">
                {
                    isLoading ?
                        <Spinner />
                        :
                        data && data?.faqs?.map(({ _id, question, answer }, index) => {
                            return (
                                <div className={styles.item} key={_id} >
                                    <button type="button" className={`title ${styles.title}`} onClick={() => toggleFAQ(index)}>
                                        <h2 className="text-2xl text-left sm:text-xl">{question}</h2>
                                        <BsChevronRight className="ml-4 w-8 shrink-0" />
                                    </button>
                                    <div className={`${styles.body} ${activeIndex == index ? 'visible' : 'hidden'}`}>
                                        <div className="text-left text-lg" dangerouslySetInnerHTML={{ __html: answer }} />
                                    </div>
                                </div>
                            );
                        })
                }
            </div>
        </section>
    );
}

export default FAQs;
