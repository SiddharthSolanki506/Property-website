import React, { useState } from 'react';
import { 
  Calculator, 
  IndianRupee, 
  Building2, 
  CheckCircle2, 
  HelpCircle, 
  FileText, 
  PieChart, 
  TrendingUp, 
  ShieldCheck,
  MessageSquare
} from 'lucide-react';
import { formatIndianCurrency, getWhatsAppUrl } from '../config/business';

export const CalculatorsPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'emi' | 'stamp_duty' | 'affordability'>('emi');

  // EMI Calculator States
  const [loanAmount, setLoanAmount] = useState(7500000); // 75 Lakhs
  const [interestRate, setInterestRate] = useState(8.5); // 8.5%
  const [tenureYears, setTenureYears] = useState(20); // 20 years

  // Stamp Duty States
  const [propertyPrice, setPropertyPrice] = useState(10000000); // 1 Cr
  const [stateName, setStateName] = useState('Uttar Pradesh (Noida)');
  const [buyerGender, setBuyerGender] = useState<'male' | 'female' | 'joint'>('joint');

  // Affordability States
  const [monthlyIncome, setMonthlyIncome] = useState(180000);
  const [existingEmi, setExistingEmi] = useState(20000);
  const [downPaymentSavings, setDownPaymentSavings] = useState(2500000);

  // EMI Calculation Formula
  const monthlyRate = interestRate / 12 / 100;
  const totalMonths = tenureYears * 12;
  const emi = Math.round(
    (loanAmount * monthlyRate * Math.pow(1 + monthlyRate, totalMonths)) /
    (Math.pow(1 + monthlyRate, totalMonths) - 1)
  );
  const totalPayment = emi * totalMonths;
  const totalInterest = totalPayment - loanAmount;

  // Stamp Duty Rates Map in India
  const stampRates: Record<string, { male: number; female: number; joint: number; regFee: number }> = {
    'Uttar Pradesh (Noida)': { male: 7.0, female: 6.0, joint: 6.5, regFee: 1.0 },
    'Delhi': { male: 6.0, female: 4.0, joint: 5.0, regFee: 1.0 },
    'Haryana (Gurugram)': { male: 7.0, female: 5.0, joint: 6.0, regFee: 1.0 },
    'Maharashtra (Mumbai/Pune)': { male: 6.0, female: 5.0, joint: 5.5, regFee: 1.0 },
    'Karnataka (Bangalore)': { male: 5.0, female: 5.0, joint: 5.0, regFee: 1.0 },
    'Telangana (Hyderabad)': { male: 6.0, female: 6.0, joint: 6.0, regFee: 1.5 },
  };

  const currentRateObj = stampRates[stateName] || stampRates['Uttar Pradesh (Noida)'];
  const stampPercent = currentRateObj[buyerGender];
  const stampDutyAmount = (propertyPrice * stampPercent) / 100;
  const registrationAmount = (propertyPrice * currentRateObj.regFee) / 100;
  const totalGovtCharges = stampDutyAmount + registrationAmount;

  // Affordability Logic (Max 50% FOIR - Fixed Obligation to Income Ratio)
  const maxAllowableEmi = Math.max(0, (monthlyIncome * 0.5) - existingEmi);
  const maxLoanEligible = Math.round(
    (maxAllowableEmi * (Math.pow(1 + monthlyRate, totalMonths) - 1)) /
    (monthlyRate * Math.pow(1 + monthlyRate, totalMonths))
  );
  const maxHomeBudget = maxLoanEligible + downPaymentSavings;

  return (
    <div className="min-h-screen bg-slate-50/70 pb-20">
      
      {/* Header */}
      <div className="bg-[#0a192f] text-white py-12 px-4 sm:px-6 lg:px-8 border-b border-slate-800">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center space-x-1.5 text-xs font-bold text-amber-400 bg-amber-950/60 px-3 py-1 rounded-full border border-amber-500/30 mb-3">
            <Calculator className="w-3.5 h-3.5" />
            <span>Financial Planning Tools</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-black tracking-tight">
            Indian Real Estate Calculators
          </h1>
          <p className="text-sm text-slate-300 mt-2 max-w-xl mx-auto">
            Accurate EMI estimations, state-wise stamp duty & registration charges, and home affordability models calibrated for Indian home buyers.
          </p>

          {/* Calculator Tabs */}
          <div className="mt-8 flex justify-center">
            <div className="inline-flex bg-slate-800/90 p-1.5 rounded-2xl border border-slate-700">
              <button
                onClick={() => setActiveTab('emi')}
                className={`px-4 sm:px-6 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all ${
                  activeTab === 'emi'
                    ? 'bg-amber-500 text-[#0a192f] shadow-md'
                    : 'text-slate-300 hover:text-white'
                }`}
              >
                Home Loan EMI
              </button>
              <button
                onClick={() => setActiveTab('stamp_duty')}
                className={`px-4 sm:px-6 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all ${
                  activeTab === 'stamp_duty'
                    ? 'bg-amber-500 text-[#0a192f] shadow-md'
                    : 'text-slate-300 hover:text-white'
                }`}
              >
                Stamp Duty & Reg.
              </button>
              <button
                onClick={() => setActiveTab('affordability')}
                className={`px-4 sm:px-6 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all ${
                  activeTab === 'affordability'
                    ? 'bg-amber-500 text-[#0a192f] shadow-md'
                    : 'text-slate-300 hover:text-white'
                }`}
              >
                Affordability
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-10">
        
        {/* TAB 1: HOME LOAN EMI CALCULATOR */}
        {activeTab === 'emi' && (
          <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200/90 shadow-sm space-y-8 animate-in fade-in duration-150">
            
            <div className="border-b border-slate-100 pb-4">
              <h2 className="text-xl font-bold text-slate-900">Home Loan EMI Calculator</h2>
              <p className="text-xs text-slate-500 mt-0.5">Calculate your monthly outflow across SBI, HDFC, ICICI, Axis and other major banks.</p>
            </div>

            <div className="space-y-6">
              {/* Loan Amount */}
              <div>
                <div className="flex justify-between items-center text-sm font-bold text-slate-700 mb-2">
                  <span>Loan Amount</span>
                  <span className="text-lg text-amber-600 font-extrabold">{formatIndianCurrency(loanAmount)}</span>
                </div>
                <input
                  type="range"
                  min={1000000}
                  max={50000000}
                  step={500000}
                  value={loanAmount}
                  onChange={(e) => setLoanAmount(Number(e.target.value))}
                  className="w-full accent-amber-500"
                />
                <div className="flex justify-between text-[11px] text-slate-400 mt-1">
                  <span>₹10 Lakh</span>
                  <span>₹5 Crore</span>
                </div>
              </div>

              {/* Interest Rate */}
              <div>
                <div className="flex justify-between items-center text-sm font-bold text-slate-700 mb-2">
                  <span>Interest Rate (% per annum)</span>
                  <span className="text-lg text-amber-600 font-extrabold">{interestRate}%</span>
                </div>
                <input
                  type="range"
                  min={7.5}
                  max={13}
                  step={0.1}
                  value={interestRate}
                  onChange={(e) => setInterestRate(Number(e.target.value))}
                  className="w-full accent-amber-500"
                />
                <div className="flex justify-between text-[11px] text-slate-400 mt-1">
                  <span>7.5% (Prime)</span>
                  <span>13%</span>
                </div>
              </div>

              {/* Tenure */}
              <div>
                <div className="flex justify-between items-center text-sm font-bold text-slate-700 mb-2">
                  <span>Loan Tenure</span>
                  <span className="text-lg text-amber-600 font-extrabold">{tenureYears} Years ({tenureYears * 12} Months)</span>
                </div>
                <input
                  type="range"
                  min={5}
                  max={30}
                  step={1}
                  value={tenureYears}
                  onChange={(e) => setTenureYears(Number(e.target.value))}
                  className="w-full accent-amber-500"
                />
                <div className="flex justify-between text-[11px] text-slate-400 mt-1">
                  <span>5 Years</span>
                  <span>30 Years</span>
                </div>
              </div>
            </div>

            {/* Results Output Ribbon */}
            <div className="bg-[#0a192f] text-white p-6 sm:p-8 rounded-2xl shadow-md">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-center sm:text-left">
                <div>
                  <div className="text-xs text-slate-400">Monthly EMI</div>
                  <div className="text-2xl sm:text-3xl font-black text-amber-400 mt-1">
                    ₹{emi.toLocaleString('en-IN')}
                  </div>
                  <div className="text-[10px] text-slate-400 mt-0.5">Payable every month</div>
                </div>

                <div>
                  <div className="text-xs text-slate-400">Total Interest Payable</div>
                  <div className="text-xl sm:text-2xl font-bold text-slate-200 mt-1">
                    {formatIndianCurrency(totalInterest)}
                  </div>
                  <div className="text-[10px] text-slate-400 mt-0.5">Across {tenureYears} years</div>
                </div>

                <div>
                  <div className="text-xs text-slate-400">Total Payment (P + I)</div>
                  <div className="text-xl sm:text-2xl font-bold text-slate-200 mt-1">
                    {formatIndianCurrency(totalPayment)}
                  </div>
                  <div className="text-[10px] text-slate-400 mt-0.5">Principal + Interest</div>
                </div>
              </div>

              <div className="mt-6 pt-5 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-3">
                <span className="text-xs text-slate-300">
                  Want the lowest bank interest rates with free documentation?
                </span>
                <button
                  onClick={() => {
                    const msg = `Hi PropertyDekhey, I calculated an EMI of ₹${emi.toLocaleString('en-IN')} on ₹${formatIndianCurrency(loanAmount)}. Please connect me with bank partners.`;
                    window.open(getWhatsAppUrl(msg), '_blank');
                  }}
                  className="w-full sm:w-auto px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl text-xs flex items-center justify-center space-x-2"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>Get Bank Offers on WhatsApp</span>
                </button>
              </div>
            </div>

          </div>
        )}

        {/* TAB 2: STAMP DUTY & REGISTRATION */}
        {activeTab === 'stamp_duty' && (
          <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200/90 shadow-sm space-y-8 animate-in fade-in duration-150">
            
            <div className="border-b border-slate-100 pb-4">
              <h2 className="text-xl font-bold text-slate-900">Stamp Duty & Registration Calculator</h2>
              <p className="text-xs text-slate-500 mt-0.5">Government dues breakdown by Indian states and buyer gender concessions.</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <label className="block text-xs font-bold uppercase text-slate-500 mb-1.5">
                  State / Region
                </label>
                <select
                  value={stateName}
                  onChange={(e) => setStateName(e.target.value)}
                  className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium focus:outline-none"
                >
                  {Object.keys(stampRates).map((st) => (
                    <option key={st} value={st}>{st}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-slate-500 mb-1.5">
                  Property Ownership Gender
                </label>
                <div className="grid grid-cols-3 gap-1.5">
                  {(['male', 'female', 'joint'] as const).map((g) => (
                    <button
                      key={g}
                      type="button"
                      onClick={() => setBuyerGender(g)}
                      className={`py-2 rounded-xl text-xs font-bold capitalize border transition-all ${
                        buyerGender === g
                          ? 'bg-[#0a192f] text-amber-400 border-[#0a192f]'
                          : 'border-slate-200 text-slate-700 hover:bg-slate-50'
                      }`}
                    >
                      {g === 'joint' ? 'Joint / Both' : g}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div>
              <div className="flex justify-between items-center text-sm font-bold text-slate-700 mb-2">
                <span>Property Agreement Value</span>
                <span className="text-lg text-amber-600 font-extrabold">{formatIndianCurrency(propertyPrice)}</span>
              </div>
              <input
                type="range"
                min={2000000}
                max={50000000}
                step={500000}
                value={propertyPrice}
                onChange={(e) => setPropertyPrice(Number(e.target.value))}
                className="w-full accent-amber-500"
              />
            </div>

            {/* Results Ribbon */}
            <div className="bg-[#0a192f] text-white p-6 sm:p-8 rounded-2xl shadow-md space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pb-4 border-b border-slate-800">
                <div>
                  <div className="text-xs text-slate-400">Stamp Duty ({stampPercent}%)</div>
                  <div className="text-xl font-bold text-amber-400 mt-0.5">
                    {formatIndianCurrency(stampDutyAmount)}
                  </div>
                  <div className="text-[10px] text-slate-400 mt-0.5">Includes gender concessions</div>
                </div>

                <div>
                  <div className="text-xs text-slate-400">Registration ({currentRateObj.regFee}%)</div>
                  <div className="text-xl font-bold text-slate-200 mt-0.5">
                    {formatIndianCurrency(registrationAmount)}
                  </div>
                  <div className="text-[10px] text-slate-400 mt-0.5">Sub-Registrar fee</div>
                </div>

                <div>
                  <div className="text-xs text-slate-400">Total Government Dues</div>
                  <div className="text-2xl font-black text-emerald-400 mt-0.5">
                    {formatIndianCurrency(totalGovtCharges)}
                  </div>
                  <div className="text-[10px] text-slate-400 mt-0.5">Payable at deed execution</div>
                </div>
              </div>

              <div className="text-xs text-slate-300 flex items-start space-x-2">
                <ShieldCheck className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <span>Note: Municipal corporation surcharge or metro cess may apply in specific municipal zones. Consult our legal desk for exact sub-registrar calculation.</span>
              </div>
            </div>

          </div>
        )}

        {/* TAB 3: AFFORDABILITY CALCULATOR */}
        {activeTab === 'affordability' && (
          <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200/90 shadow-sm space-y-8 animate-in fade-in duration-150">
            
            <div className="border-b border-slate-100 pb-4">
              <h2 className="text-xl font-bold text-slate-900">Home Affordability Calculator</h2>
              <p className="text-xs text-slate-500 mt-0.5">Discover your maximum realistic property budget based on current income and savings.</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label className="block text-xs font-bold uppercase text-slate-500 mb-1.5">
                  Gross Monthly Household Income (₹)
                </label>
                <input
                  type="number"
                  value={monthlyIncome}
                  onChange={(e) => setMonthlyIncome(Number(e.target.value))}
                  className="w-full px-3 py-2.5 bg-slate-50 border rounded-xl text-sm font-bold"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-slate-500 mb-1.5">
                  Existing Monthly Loan EMIs (₹)
                </label>
                <input
                  type="number"
                  value={existingEmi}
                  onChange={(e) => setExistingEmi(Number(e.target.value))}
                  className="w-full px-3 py-2.5 bg-slate-50 border rounded-xl text-sm font-bold"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block text-xs font-bold uppercase text-slate-500 mb-1.5">
                  Total Down Payment Savings Available (₹)
                </label>
                <input
                  type="number"
                  value={downPaymentSavings}
                  onChange={(e) => setDownPaymentSavings(Number(e.target.value))}
                  className="w-full px-3 py-2.5 bg-slate-50 border rounded-xl text-sm font-bold"
                />
              </div>
            </div>

            {/* Affordability Output */}
            <div className="bg-[#0a192f] text-white p-6 sm:p-8 rounded-2xl shadow-md">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-center sm:text-left">
                <div>
                  <div className="text-xs text-slate-400">Max Recommended Budget</div>
                  <div className="text-2xl sm:text-3xl font-black text-amber-400 mt-1">
                    {formatIndianCurrency(maxHomeBudget)}
                  </div>
                  <div className="text-[10px] text-slate-400 mt-0.5">Loan + Down Payment</div>
                </div>

                <div>
                  <div className="text-xs text-slate-400">Eligible Home Loan</div>
                  <div className="text-xl sm:text-2xl font-bold text-slate-200 mt-1">
                    {formatIndianCurrency(maxLoanEligible)}
                  </div>
                  <div className="text-[10px] text-slate-400 mt-0.5">Based on 50% FOIR</div>
                </div>

                <div>
                  <div className="text-xs text-slate-400">Max Monthly EMI Capacity</div>
                  <div className="text-xl sm:text-2xl font-bold text-emerald-400 mt-1">
                    ₹{maxAllowableEmi.toLocaleString('en-IN')}
                  </div>
                  <div className="text-[10px] text-slate-400 mt-0.5">Comfortable debt limit</div>
                </div>
              </div>
            </div>

          </div>
        )}

      </div>

    </div>
  );
};
