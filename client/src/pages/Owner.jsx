export const Owner = () => {
  return (
    <div className="flex flex-col items-center pt-16 px-6 pb-16 min-h-screen">
      <h1 className="text-3xl font-normal text-center mb-10 leading-tight text-[#202124]">
        46_Watcharine (Nat/นัท)
        <br />
        <span className="text-[#1a73e8] font-medium">— The Owner</span>
      </h1>

      <div className="w-full max-w-2xl bg-white rounded-lg border border-[#dadce0] p-8 flex flex-col items-center">
        <div className="w-40 h-40 rounded-full overflow-hidden mb-8 border-2 border-[#dadce0] hover:border-[#1a73e8] transition-colors duration-300">
          <img
            src="https://i.postimg.cc/vB8W1Rfb/me1.jpg"
            alt="Owner"
            className="w-full h-full object-cover"
          />
        </div>

        <div className="text-center space-y-3 max-w-lg">
          <h2 className="text-xl font-medium text-[#5f6368] italic">
             Short Bio
          </h2>
          <p className="text-lg font-medium text-[#202124]">
            The Adventure seeker
          </p>
          <div className="w-12 h-[2px] bg-[#1a73e8] mx-auto my-3" />
          <p className="text-sm text-[#5f6368] leading-relaxed bg-[#f8f9fa] p-4 rounded-lg border border-[#e8eaed]">
            Adventure seeker who’s equally at home binge-watching Netflix or hiking a hidden trail. Passionate about good coffee, bad jokes, and making memories that aren’t on Instagram. Looking for someone to share laughs, spontaneous road trips, and the occasional pizza slice (or two).
            <br />
            <span className="text-[#1a73e8] font-medium mt-2 block italic">
              {`"React Makes Life Better!"`}
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Owner;
