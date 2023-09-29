"use client"
import { useEffect } from 'react';
import { BsChevronRight } from 'react-icons/bs';
import options from '@/lib/data/FaqData';
import styles from '@/styles/faq.module.css';

function FAQs() {
    useEffect(() => {
        const titleElements = document.querySelectorAll(`.title`);


        // titleElements.forEach((titleElement) => {
        //     titleElement.addEventListener('click', () => {
        //         const clickedElement = titleElement;
        //         const parentAccordionItem = clickedElement.parentElement.parentElement;
        //         const rotateIcon = clickedElement.querySelector('.rotate-90');

        //         // Initially removing rotate-clockwise class from all dropdown icons
        //         parentAccordionItem.querySelectorAll('.rotate-90').forEach((icon) => {
        //             icon.classList.remove('rotate-90');
        //         });

        //         if (clickedElement.parentElement.classList.contains(styles.active)) {
        //             // If one accordion is already open and the same ACCORDION HEADER is clicked
        //             rotateIcon.classList.remove('rotate-90');
        //             clickedElement.parentElement.classList.remove(styles.active);
        //             clickedElement.nextElementSibling.style.display = 'none';
        //         } else {
        //             // Closing all opened accordion
        //             parentAccordionItem.querySelectorAll(`.${styles.item}`).forEach((item) => {
        //                 item.classList.remove(styles.active);
        //             });

        //             parentAccordionItem.querySelectorAll(`.${styles.body}`).forEach((body) => {
        //                 body.style.display = 'none';
        //             });

        //             // Opening the clicked accordion item
        //             rotateIcon.classList.add('rotate-90');
        //             clickedElement.parentElement.classList.add(styles.active);
        //             clickedElement.nextElementSibling.style.display = 'block';
        //         }
        //     });
        // });
    }, []);

    return (
        <section className="container-70 pt-16 sm:pt-8 sm:w-4/5 xs:w-[85%]">
            <div className="mt-6 mb-20 sm:mt-8 sm:mb-20 xs:mt-4 xs:mb-16">
                <h1 className="text-6xl xl:text-5xl xl:leading-snug sm:text-4xl text-center">
                    Frequently Asked Question (FAQs) 🤔
                </h1>
            </div>
            <div className="grid gap-4 sm:gap-2">
                {options.map(({ title, body }) => {
                    return (
                        <div className={styles.item} key={title.props.children}>
                            <button type="button" className={`title ${styles.title}`}>
                                <h2 className="text-2xl text-left sm:text-xl">{title}</h2>
                                <BsChevronRight className="ml-4 w-8 shrink-0" />
                            </button>
                            <div className={styles.body}>
                                <div className="text-left text-lg">{body}</div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </section>
    );
}

export default FAQs;
