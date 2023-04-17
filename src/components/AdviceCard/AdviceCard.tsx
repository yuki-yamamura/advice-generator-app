import { FC, useRef } from 'react';
import useRandomAdvice from 'components/AdviceCard/useRandomAdvice';

const AdviceCard: FC = () => {
  const { data, error, isLoading, refreshAdvice } = useRandomAdvice();
  const buttonRef = useRef<HTMLButtonElement>(null);
  const handleClick = () => {
    refreshAdvice();
    buttonRef.current?.blur();
  };

  return (
    <div className="relative">
      <div className="max-w-[540px] rounded-xl bg-darkGrayishBlue px-6 py-6">
        <div className="flex flex-col items-center gap-y-6 pb-16 pt-10 text-center font-manrope">
          {error && (
            <div className="text-2xl text-lightCyan xs:text-[28px]">
              Something went wrong. Try load the page.
            </div>
          )}
          {isLoading ? (
            <div className="text-2xl text-lightCyan xs:text-[28px]">
              Loading...
            </div>
          ) : (
            <>
              <div className="text-[11px] tracking-[3.45714px] text-neonGreen xs:text-[13px]">
                ADVICE #{data?.slip?.id}
              </div>
              <div className="text-2xl text-lightCyan xs:text-[28px]">{`"${
                data?.slip?.advice ?? ''
              }"`}</div>
            </>
          )}
          <img src="/images/pattern-divider-mobile.svg" alt="" />
        </div>
      </div>
      <div className="absolute -bottom-8 left-1/2 -translate-x-8">
        <button
          type="button"
          onClick={handleClick}
          ref={buttonRef}
          className="relative h-16 w-16 rounded-full bg-neonGreen duration-500 hover:shadow-[0_0_40px_hsl(150,100%,66%)] focus:shadow-[0_0_40px_hsl(150,100%,66%)] focus:outline-none"
        >
          <img
            src="images/icon-dice.svg"
            alt="button?"
            className="absolute left-5 top-5"
          />
        </button>
      </div>
    </div>
  );
};

export default AdviceCard;
