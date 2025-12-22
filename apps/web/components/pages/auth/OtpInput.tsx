import TextField from 'components/base/TextField';

type OtpInputProps = {
  value: string;
  onChange: (value: string) => void;
  error?: boolean;
};

const OTP_LENGTH = 4;

const OtpInput = ({ value = '', onChange, error }: OtpInputProps) => {
  const otpArray = Array.from(
    { length: OTP_LENGTH },
    (_, i) => value[i] || ''
  );

  const handleChange = (index: number, char: string) => {
    if (!/^\d?$/.test(char)) return;

    const newOtp = [...otpArray];
    newOtp[index] = char;
    onChange(newOtp.join(''));

    if (char && index < OTP_LENGTH - 1) {
      document.getElementById(`otp-${index + 1}`)?.focus();
    }
  };

  const handleBackspace = (index: number) => {
    if (!otpArray[index] && index > 0) {
      document.getElementById(`otp-${index - 1}`)?.focus();
    }
  };

  return (
    <div className="mt-10">
      <label className="block mb-3 text-sm font-medium">OTP</label>

      <div className="flex justify-between gap-3 h-full">
        {otpArray.map((digit, index) => (
          <TextField
            key={index}
            id={`otp-${index}`}
            type="text"
            inputMode="numeric"
            maxLength={1}
            value={digit}
            onChange={(e) => handleChange(index, e.target.value)}
            onKeyDown={(e) =>
              e.key === 'Backspace' && handleBackspace(index)
            }
            rootClassName='w-auto'
            className={`w-12 h-12 text-center text-lg
              ${error ? 'border-red-500' : 'border-gray-300'}`}

          />
        ))}
      </div>
    </div>
  );
};

export default OtpInput;
