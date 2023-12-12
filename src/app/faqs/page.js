"use client"
import { useEffect, useState } from 'react';
import { BsChevronRight } from 'react-icons/bs';
import options from '@/lib/data/FaqData';
import styles from '@/styles/faq.module.css';

function FAQs() {

    const [activeIndex, setActiveIndex] = useState(null);

    const toggleFAQ = (index) => {
        if (activeIndex == index) setActiveIndex(null);
        else setActiveIndex(index)
    }

    return (
        <section className="container-70 pt-16 sm:pt-8 sm:w-4/5 xs:w-[85%]">
            <div className="mt-6 mb-20 sm:mt-8 sm:mb-20 xs:mt-4 xs:mb-16">
                <h1 className="text-6xl xl:text-5xl xl:leading-snug sm:text-4xl text-center">
                    Frequently Asked Question (FAQs) 🤔
                </h1>
            </div>
            <div className="grid gap-4 sm:gap-2">
                {
                    options.map(({ title, body }, index) => {
                        return (
                            <div className={styles.item} key={title.props.children} onClick={() => toggleFAQ(index)}>
                                <button type="button" className={`title ${styles.title}`}>
                                    <h2 className="text-2xl text-left sm:text-xl">{title}</h2>
                                    <BsChevronRight className="ml-4 w-8 shrink-0" />
                                </button>
                                <div className={`${styles.body} ${activeIndex == index ? 'visible' : 'hidden'}`}>
                                    <div className="text-left text-lg">{body}</div>
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
