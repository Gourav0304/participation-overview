import { userApi } from '@/services/userApi';
import { DetailsForm } from '@/components/DetailsForm';
import { ParticipationTable } from '@/components/ParticipationTable';
import { DoughnutChart } from '@/components/Chart';

export default async function HomePage() {
  const users = await userApi.getUsers();

  return (
    <main className="min-h-screen bg-amber-50">
      <section className="bg-gradient-to-r from-cyan-300 to-cyan-400 p-8 shadow-lg">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-6 text-center md:text-left">
            ADD PARTICIPANT
          </h2>
          <DetailsForm />
        </div>
      </section>

      <section className="max-w-6xl mx-auto py-16 px-4 md:px-0">
        <h1 className="text-3xl md:text-4xl font-extrabold text-gray-800 mb-2 text-center">
          Participation Details
        </h1>
        <p className="text-gray-500 text-center mb-12">
          Visual representation of all participants and their contribution percentages
        </p>

        <div className="flex flex-col lg:flex-row gap-12 lg:gap-24 items-stretch">
          <div className="flex-1 p-3 overflow-x-auto">
            <h3 className="text-xl font-semibold mb-4 text-gray-700">Participant Table</h3>
            <ParticipationTable data={users} />
          </div>
          <div className="flex-1 p-3 flex flex-col items-center justify-center">
            <h3 className="text-xl font-semibold mb-4 text-gray-700">Participation Chart</h3>
            <DoughnutChart data={users} />
          </div>
        </div>
      </section>
    </main>
  );
}
