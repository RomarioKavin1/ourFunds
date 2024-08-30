const BackgroundGradient = () => {
  return (
    <div className="background-gradient">
        {/* Top left glow effect */}
      <div className="circlePosition w-[480px] h-[400px]
      bg-first rounded-[100%] absolute z-1 top-[-40%] translate-x-[30px] translate-y-[40%] blur-[70px]">
      </div>

      {/* Bottom center glow effect */}
      <div className="absolute bottom-56 left-1/2 transform -z-10 -translate-x-1/2 
        translate-y-[40%] w-[700px] h-[420px] bg-first rounded-[100%] blur-[70px]">
      </div>
    </div>
  );
}

export default BackgroundGradient;