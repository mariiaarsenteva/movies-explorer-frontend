import './AboutProject.css';
import Wrapper from '../Wrapper/Wrapper'

export default function AboutProject() {
   return (
      <section className="about">
         <Wrapper>
            <h2 className="about__title">О проекте</h2>
            <div className='about__container'>
               <div className='about__column'>
                  <h3 className='about__subtitle'>Дипломный проект включал 5 этапов</h3>
                  <p className='about__description'>Составление плана, работу над бэкендом, вёрстку, добавление функциональности и финальные доработки.</p>
               </div>
               <div className='about__column'>
                  <h3 className='about__subtitle'>На выполнение диплома ушло 5 недель</h3>
                  <p className='about__description'>У каждого этапа был мягкий и жёсткий дедлайн, которые нужно было соблюдать, чтобы успешно защититься.</p>
               </div>
            </div>
            <div>
               <div className='about__timeline'>
                  <p className='about__progress'>1 неделя</p>
                  <p className='about__progress'>4 недели</p>
               </div>
               <div className='about__caption-container'>
                  <p className='about__caption'>Back-end</p>
                  <p className='about__caption'>Front-end</p>
               </div>
            </div>
         </Wrapper>
      </section>
   )
}
