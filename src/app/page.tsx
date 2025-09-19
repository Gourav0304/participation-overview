import { userApi } from '@/lib/userApi';
import { DetailsForm } from '@/components/Form/DetailsForm';
import { ParticipationTable } from '@/components/ParticipationTable';
import { DoughnutChart } from '@/components/Chart/Chart';

export default async function HomePage() {
  const users = await userApi.getUsers();

  return (
    <main className="min-h-screen bg-gray-50">
      <section className="bg-cyan-500 py-10 shadow-lg">
        <div className="max-w-6xl mx-auto px-4">
          <DetailsForm />
        </div>
      </section>

      <section className="max-w-7xl mx-auto py-16 px-4">
        <header className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-extrabold text-gray-800">
            Participation Details
          </h1>
          <p className="text-gray-500 mt-2">
            Visual representation of all participants and their contribution percentages
          </p>
        </header>

        <div className="flex flex-col lg:flex-row gap-12 items-stretch">
          <div className="flex-1 p-3 overflow-x-auto">
            <h2 className="text-xl font-semibold text-center text-gray-700 mb-6">
              Participant Table
            </h2>
            <ParticipationTable userData={users} />
          </div>
          <div className="flex-1 p-3 flex flex-col items-center justify-center">
            <h2 className="text-xl font-semibold text-gray-700 mb-6 text-center">
              Participation Chart
            </h2>
            <DoughnutChart doughnutData={users} />
          </div>
        </div>
      </section>
    </main>
  );
}
