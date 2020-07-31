import { uuid } from 'uuidv4';
import { isEqual } from 'date-fns';
import IAppointmentsRepository from '@modules/appointments/repositories/IAppointmentsRepository';
import Appointment from '@modules/appointments/infra/typeorm/entities/Appointment';
import ICreateAppointmentDTO from '@modules/appointments/dtos/ICreateAppointmentDTO';

class AppointmentsRepository implements IAppointmentsRepository {
    private appointments: Appointment[] = [];

    public async create({
        /* eslint-disable camelcase */
        provider_id,
        date,
    }: ICreateAppointmentDTO): Promise<Appointment> {
        const appointment = new Appointment();

        // Object.assign(appointment, { id: uuid(), date, provider_id });

        appointment.id = uuid();
        appointment.provider_id = provider_id;
        appointment.date = date;

        this.appointments.push(appointment);

        return appointment;
    }

    public async findByDate(date: Date): Promise<Appointment | undefined> {
        const findAppointment = this.appointments.find(appointment =>
            isEqual(appointment.date, date),
        );

        return findAppointment;
    }
}

export default AppointmentsRepository;
