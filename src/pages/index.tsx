import DatePicker from 'react-datepicker';
import { useState, FormEvent } from 'react';
import ptBR from 'date-fns/locale/pt-BR';
import { format } from 'date-fns';

import { useStatus } from '../hooks/useStatus';
import { database } from '../services/firebase';
import { Header } from '../components/Header';
import { DropdownStatus } from '../components/DropdownStatus';
import { Task } from '../components/Task';

import 'react-datepicker/dist/react-datepicker.css';
import styles from '../../styles/home.module.scss';
import { AsideFilters } from '../components/AsideFilters';

export default function Home() {
  const { taksStatus } = useStatus();

  const [startDate, setStartDate] = useState<Date | null>(new Date());
  const [taskTitle, setTaskTitle] = useState('');
  const [taskResume, setTaskResume] = useState('');
  const [dateFormatted, setDateFormatted] = useState<Date | string>(format(new Date(), 'dd/MM/yyyy'));

  function handleSetDate(date: Date | null) {
    if (date === null) {
      return;
    }

    setDateFormatted(format(date, 'dd/MM/yyyy'));
    setStartDate(date);
  }


  async function handleCreateTask(event: FormEvent) {
    event.preventDefault();

    if (taskTitle.trim() === '' || taskResume.trim() === '') {
      alert('Preencha todos os campos!');
      return;
    }

    const taskRef = database.ref('tasks');
    await taskRef.push({
      title: taskTitle,
      resume: taskResume,
      status: taksStatus,
      date: dateFormatted
    });
  }

  return (
    <>
      <Header />

      <main className={styles.homeContainer} >
        <AsideFilters />
        <div className={styles.homeContent}>
          <form onSubmit={handleCreateTask}>
            <input
              type="text"
              placeholder="Título"
              className={styles.taksCreateInput}
              value={taskTitle}
              onChange={event => setTaskTitle(event.target.value)}
            />
            <textarea
              name="taskresume"
              placeholder="Resumo da atividade"
              onChange={event => setTaskResume(event.target.value)}
            ></textarea>

            <footer>
              <DatePicker
                selected={startDate}
                locale={ptBR}
                onChange={(date: Date | null) => handleSetDate(date)}
                dateFormat='dd/MM/yyyy'
                minDate={new Date()}
              />

              <div className={styles.footerButtons}>
                <DropdownStatus />
                <button type="submit" className={styles.buttonFooterCreateTask}>
                  Criar
                </button>
              </div>
            </footer>
          </form>

          <div className={styles.tasksContent}>
            <Task />
          </div>
        </div>
      </main>
    </>
  )
}
