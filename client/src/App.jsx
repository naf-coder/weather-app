import Weather from "./components/Weather";

function App() {
  return (
    <>
      <div className="min-w-screen min-h-screen flex justify-center items-center font-poppins bg-[url('/src/assets/blue-sky-with-clouds-distance.jpg')] bg-cover bg-center sm:bg-top md:bg-center">
        <Weather />
      </div>
    </>
  );
}
export default App;
