import { JogEntity } from '../services/jogs';

export const sortJogsByDate = (jog1: JogEntity, jog2: JogEntity) => jog2.date - jog1.date;
