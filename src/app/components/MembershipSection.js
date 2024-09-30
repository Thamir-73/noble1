import React, { useEffect, useRef, useState } from 'react';
import Marquee from '@/components/magicui/marquee';
import { MagicCard } from '@/components/magicui/magic-card';

const MembershipSection = ({ language }) => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.1 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, []);

  const text = {
    ar: {
      title: 'خدماتنا',
      services: [
        { title: 'طب الأسنان العام', description: 'هذا النص هو مثال لنص يمكن أن يستبدل في نفس المساحة.' },
        { title: 'طب الأسنان التجميلي', description: 'لقد تم توليد هذا النص من مولد النص العربى.' },
        { title: 'تقويم الأسنان', description: 'حيث يمكنك أن تولد مثل هذا النص أو العديد من النصوص الأخرى.' },
        { title: 'جراحة الفم', description: 'إضافة إلى زيادة عدد الحروف التى يولدها التطبيق.' },
      ]
    },
    en: {
      title: 'Our Services',
      services: [
        { title: 'General Dentistry', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.' },
        { title: 'Cosmetic Dentistry', description: 'Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.' },
        { title: 'Orthodontics', description: 'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.' },
        { title: 'Oral Surgery', description: 'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum.' },
      ]
    }
  };

  const isRTL = language === 'ar';

  
  return (
    <div 
      ref={ref}
      className={`mt-10 transition-opacity duration-1000 ${isVisible ? 'opacity-100' : 'opacity-0'}`}
    >
      <div className={`bg-white bg-opacity-70 dark:bg-gray-800 dark:bg-opacity-70 p-6 md:p-8 rounded-2xl shadow-2xl mb-12 relative overflow-hidden border border-green-200 dark:border-green-700 ${isRTL ? 'rtl' : 'ltr'}`}>
        <h2 className={`text-3xl md:text-4xl font-bold text-[#4CAF50] dark:text-green-300 mb-8 text-center`}>
          {text[language].title}
        </h2>
        <Marquee className="py-4" pauseOnHover={true}>
          {text[language].services.map((service, index) => (
            <MagicCard 
              key={index} 
              className="w-64 h-80 mx-4 flex-shrink-0 bg-gradient-to-br from-green-100 to-gray-100 dark:from-green-900 dark:to-gray-800"
            >
              <div className="p-6 flex flex-col h-full justify-between">
                <h3 className="text-xl font-semibold text-[#4CAF50] dark:text-green-300 mb-4">{service.title}</h3>
                <p className="text-sm text-gray-600 dark:text-gray-300">{service.description}</p>
              </div>
            </MagicCard>
          ))}
        </Marquee>
      </div>
      <style jsx>{`
        @media (max-width: 640px) {
          .w-64 {
            width: 80vw;
          }
          .h-80 {
            height: 60vw;
          }
        }
      `}</style>
    </div>
  );
};

export default MembershipSection;