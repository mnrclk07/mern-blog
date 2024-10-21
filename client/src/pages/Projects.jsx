import CallToAction from "../components/CallToAction";

function Projects() {
  return (
    <div className="min-h-screen max-w-2xl mx-auto flex justify-center items-center flex-col gap-6 p-3">
      <h1 className="text-3xl font-semibold">Pojeler</h1>
      <p className="text-md text-gray-500">
        HTML, CSS ve JavaScript öğrenirken eğlenceli ve ilgi çekici projeler
        oluşturun!
      </p>
      <CallToAction />
    </div>
  );
}

export default Projects;
