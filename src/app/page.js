import Image from 'next/image';
import LineChart from './components/LineChart';
import { formatDate } from './utils/format';
// import { useState } from 'react';

const fetchData = async () => {
  const credentials = `${process.env.API_USERNAME}:${process.env.API_PASSWORD}`;
  const apiUrl = process.env.API_URL;
  const encodedCredentials = Buffer.from(credentials).toString('base64');

  const patientInfo = await fetch(apiUrl, {
    method: 'GET',
    headers: {
      Authorization: `Basic ${encodedCredentials}`,
    },
  });

  if (!patientInfo.ok) {
    throw new Error('Failed to fetch patient data');
  }
  return patientInfo.json();
};

const Home = async () => {
  const allPatients = await fetchData();
  const activePatient = allPatients.find(
    (patient) => patient.name === 'Jessica Taylor'
  );

  // const [activePatient, setActivePatient] = useState(patientData);
  // return       <div>{JSON.stringify(activePatient, null, 2)}</div>;
  return (
    <>
      <div className='bg-[#F6F7F8]'>
        <div className='px-6 rounded-[70px] h-[72px] mx-2 t-[18px] bg-[#FFFFFF] flex items-center justify-between shadow-md shadow-black/5 sticky top-0 left-0 z-30'>
          <div className='ml-[]'>
            <img src='/icons/logo.png' className='w-[211px] h-[48px]' />
          </div>
          <div className='ml-auto flex justify-center items-center '>
            {[
              {
                pageName: 'Overview',
                url: '',
                icon: '/icons/home.png',
                isActive: false,
              },
              {
                pageName: 'Patients',
                url: '',
                icon: '/icons/group.png',
                isActive: true,
              },
              {
                pageName: 'Schedules',
                url: '',
                icon: '/icons/calendar.png',
                isActive: false,
              },
              {
                pageName: 'Messages',
                url: '',
                icon: '/icons/chat_bubble.png',
                isActive: false,
              },
              {
                pageName: 'Transactions',
                url: '',
                icon: '/icons/credit_card.png',
                isActive: false,
              },
            ].map((item, index) => {
              return (
                <div
                  className={`${
                    item.isActive ? 'bg-[#01F0D0]' : 'bg-white'
                  } text-black flex justify-center font-semibold text-sm items-center mr-2 px-3 py-1 rounded-[41px]`}
                  key={index}
                >
                  <img src={item.icon} className='w-[15px] h-[15px] mr-1.5' />

                  {item.pageName}
                </div>
              );
            })}
          </div>
          <ul className='ml-auto flex items-center'>
            <li className='dropdown ml-3'>
              <button
                type='button'
                className='dropdown-toggle flex items-center'
              >
                <div className='flex-shrink-0 w-10 h-10 relative'>
                  <div className='p-1 bg-white rounded-full focus:outline-none focus:ring'>
                    <img
                      className='w-8 h-8 rounded-full'
                      src='/icons/senior.png'
                      alt='doctor'
                    />
                  </div>
                </div>
                <div className='p-2 md:block text-left'>
                  <h2 className='text-xs font-semibold text-gray-800'>
                    Dr. Jose Simmons
                  </h2>
                  <p className='text-xs text-gray-400'>General Practitioner</p>
                </div>
              </button>
            </li>
            <img src='/icons/settings.png' className='w-[19px] h-[20px] ml-2' />
            <img src='/icons/more_vert.png' className='mx-2 w-[4px] h-[18px]' />
          </ul>
        </div>
        <div className='fixed left-[18px] top-[88px] w-64 h-[1054px] bg-[#FFFFFF] p-4 z-50 sidebar-menu transition-transform rounded-[16px]'>
          <ul className='mt-4'>
            <div className='flex items-center justify-between'>
              <div className='text-gray-400 font-bold'>PATIENTS</div>
              <img src='/icons/search.png' className='w-[18px] h-[18px]' />
            </div>
            <li className='mb-1 group'>
              {allPatients.map((item, index) => {
                return (
                  <div
                    // onClick={() => setActivePatient(item)}
                    key={index}
                    className={`${
                      item.name == 'Jessica Taylor' ? 'bg-[#D8FCF7]' : ''
                    } flex items-center py-2 px-4 text-gray-900 hover:bg-[#D8FCF7] hover:text-black rounded-md group-[.active]:bg-[#01F0D0] group-[.active]:text-white group-[.selected]:bg-[#01F0D0] group-[.selected]:text-gray-100`}
                  >
                    <div className='flex justify-between items-center w-full'>
                      <div className='flex justify-start items-center'>
                        <img
                          src={item.profile_picture}
                          className='w-[48px] h-[48px]'
                          alt={item.name}
                        />
                        <div className='gap-1 ml-2'>
                          <div className='text-xs font-semibold'>
                            {item.name}
                          </div>
                          <div className='flex justify-start items-center'>
                            <div className='text-xs'>{item.gender},</div>
                            <span className='text-xs ml-1'>{item.age}</span>
                          </div>
                        </div>
                      </div>
                      <div className='gap-1 ml-2'>
                        <img src='/icons/horizon.png' className='' />
                      </div>
                    </div>
                  </div>
                );
              })}
            </li>
          </ul>
        </div>
        <div className='fixed top-0 left-0 w-full h-full bg-[#F6F7F8] z-40 md:hidden sidebar-overlay' />
        <main className='w-full rounded-[16px] md:w-[calc(100%-256px)] md:ml-64 bg-[#F6F7F8] min-h-screen transition-all main'>
          <div className='p-6 '>
            <div className='grid grid-cols-1 lg:grid-cols-3 mb-6 gap-6 '>
              <div className='bg-white border border-gray-100 shadow-md shadow-black/5 p-0 rounded-[16px] lg:col-span-2 '>
                <div className='p-6 relative flex rounded-[16px]  flex-col min-w-0 mb-4 lg:mb-0 break-words bg-[#FFFFFF]  w-full shadow-lg rounded-[16px'>
                  <div className='rounded-[16px] mb-3 px-0 border-0'>
                    <div className='flex flex-wrap items-center px-4 py-2'>
                      <div className='relative w-full max-w-full flex-grow flex-1'>
                        <h3 className='font-semibold text-base text-black'>
                          Blood Pressure
                        </h3>
                      </div>
                    </div>
                    {/* chart */}
                    <LineChart
                      diagnosisHistory={activePatient.diagnosis_history}
                    />
                  </div>
                  <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-0'>
                    <div className='bg-[#E0F3FA] rounded-[12px] p-6 '>
                      <div className='flex justify-between mb-4'>
                        <div>
                          <div className='flex items-center'>
                            <img
                              src='/icons/respiratory.png'
                              className='w-[96px] h-[96px]'
                            />
                          </div>
                          <div className='text-xs text-gray-800'>
                            Respiratory Rate
                          </div>
                          <div className='font-bold text-gray-800'>
                            {
                              activePatient.diagnosis_history[0]
                                .respiratory_rate.value
                            }
                            bpm
                          </div>
                        </div>
                      </div>
                      <div className='text-xs text-gray-400 flex items-center'>
                        {activePatient.diagnosis_history[0].respiratory_rate
                          .levels == 'Lower than Average' && (
                          <>
                            <img
                              src='/icons/ArrowDown.png'
                              className='w-[10px] h-[5px] mr-1'
                            />
                          </>
                        )}
                        {activePatient.diagnosis_history[0].respiratory_rate
                          .levels == 'Higher than Average' && (
                          <>
                            <img
                              src='/icons/ArrowUp.png'
                              className='w-[10px] h-[5px]'
                            />
                          </>
                        )}
                        {
                          activePatient.diagnosis_history[0].respiratory_rate
                            .levels
                        }
                      </div>
                    </div>
                    {/* <div className='bg-[#FFE6E9] rounded-md border border-gray-100 h-[242px] w-[228px]  p-6'> */}
                    <div className='bg-[#FFE6E9] rounded-[12px] p-6 '>
                      <div className='flex justify-between mb-4'>
                        <div>
                          <div className='flex items-center'>
                            <img
                              src='/icons/temperature.png'
                              className='w-[96px] h-[96px]'
                            />
                          </div>
                          <div className='text-xs text-gray-800'>
                            Temperature
                          </div>
                          <div className='font-bold text-gray-800'>
                            {
                              activePatient.diagnosis_history[0].temperature
                                .value
                            }
                            &deg;F
                          </div>
                        </div>
                      </div>
                      <div className='text-xs text-gray-400 flex items-center'>
                        {activePatient.diagnosis_history[0].temperature
                          .levels == 'Lower than Average' && (
                          <>
                            <img
                              src='/icons/ArrowDown.png'
                              className='w-[10px] h-[5px] mr-1'
                            />
                          </>
                        )}
                        {activePatient.diagnosis_history[0].temperature
                          .levels == 'Higher than Average' && (
                          <>
                            <img
                              src='/icons/ArrowUp.png'
                              className='w-[10px] h-[5px]'
                            />
                          </>
                        )}{' '}
                        {activePatient.diagnosis_history[0].temperature.levels}
                      </div>
                    </div>
                    <div className='bg-[#FFE6F1] rounded-[12px] p-6 '>
                      <div className='flex justify-between mb-4'>
                        <div>
                          <div className='flex items-center'>
                            <img
                              src='/icons/HeartBPM.png'
                              className='w-[96px] h-[96px]'
                            />
                          </div>
                          <div className='text-xs text-gray-800'>
                            Heart Rate
                          </div>
                          <div className='font-bold text-gray-800'>
                            {
                              activePatient.diagnosis_history[0].heart_rate
                                .value
                            }
                            bpm
                          </div>
                        </div>
                      </div>
                      <div className='text-xs text-gray-400 flex items-center'>
                        {activePatient.diagnosis_history[0].heart_rate.levels ==
                          'Lower than Average' && (
                          <>
                            <img
                              src='/icons/ArrowDown.png'
                              className='w-[10px] h-[5px] mr-1'
                            />
                          </>
                        )}
                        {activePatient.diagnosis_history[0].heart_rate.levels ==
                          'Higher than Average' && (
                          <>
                            <img
                              src='/icons/ArrowUp.png'
                              className='w-[10px] h-[5px]'
                            />
                          </>
                        )}
                        {activePatient.diagnosis_history[0].heart_rate.levels}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className=''>
                <div className='max-w-xs mt-4'>
                  <div className='bg-white shadow-xl rounded-[16px]'>
                    <div className='photo-wrapper p-2'>
                      <Image
                        className='rounded-full mx-auto'
                        src={activePatient.profile_picture}
                        width='200'
                        height='200'
                        alt={activePatient.name}
                      />
                    </div>
                    <div className='p-2'>
                      <h3 className='text-center text-xl text-gray-900 font-medium leading-8'>
                        {activePatient.name}
                      </h3>

                      <div className='text-xs my-3 flex justify-start item-start'>
                        <div>
                          <div className='flex justify-start item-center w-full mb-2'>
                            <div className='flex justify-center item-center'>
                              <div className='text-sm text-gray-500 font-semibold'>
                                <img src='/icons/BirthIcon.png' />
                              </div>
                            </div>
                            <div className='flex justify-center item-center flex-col'>
                              <div className='px-2 text-xs py-1 text-gray-500 '>
                                Date Of Birth
                              </div>
                              <div className='px-2 py-0 text-xs font-semibold text-gray-500'>
                                {formatDate(activePatient.date_of_birth)}
                              </div>
                            </div>
                          </div>
                          <div className='flex justify-start item-center w-full mb-2'>
                            <div className='flex justify-center item-center'>
                              <div className='text-sm text-gray-500 font-semibold'>
                                {activePatient.gender == 'male' ? (
                                  <img src='/icons/MaleIcon.png' />
                                ) : (
                                  <img src='/icons/FemaleIcon.png' />
                                )}
                              </div>
                            </div>
                            <div className='flex justify-center item-center flex-col'>
                              <div className='px-2 text-xs py-1 text-gray-500 '>
                                Gender
                              </div>
                              <div className='px-2 py-0 text-xs font-semibold text-gray-500'>
                                {activePatient.gender}
                              </div>
                            </div>
                          </div>
                          <div className='flex justify-start item-center w-full mb-2'>
                            <div className='flex justify-center item-center'>
                              <div className='text-sm text-gray-500 font-semibold'>
                                <img src='/icons/PhoneIcon.png' />
                              </div>
                            </div>
                            <div className='flex justify-center item-center flex-col'>
                              <div className='px-2 text-xs py-1 text-gray-500 '>
                                Contact Info
                              </div>
                              <div className='px-2 py-0 text-xs font-semibold text-gray-500'>
                                {activePatient.phone_number}
                              </div>
                            </div>
                          </div>
                          <div className='flex justify-start item-center w-full mb-2'>
                            <div className='flex justify-center item-center'>
                              <div className='text-sm text-gray-500 font-semibold'>
                                <img src='/icons/PhoneIcon.png' />
                              </div>
                            </div>
                            <div className='flex justify-center item-center flex-col'>
                              <div className='px-2 text-xs py-1 text-gray-500 '>
                                Emergency Contacts
                              </div>
                              <div className='px-2 py-0 text-xs font-semibold text-gray-500'>
                                {activePatient.emergency_contact}
                              </div>
                            </div>
                          </div>
                          <div className='flex justify-start item-center w-full mb-2'>
                            <div className='flex justify-center item-center'>
                              <div className='text-sm text-gray-500 font-semibold'>
                                <img src='/icons/InsuranceIcon.png' />
                              </div>
                            </div>
                            <div className='flex justify-center item-center flex-col'>
                              <div className='px-2 text-xs py-1 text-gray-500 '>
                                Insurance Provider
                              </div>
                              <div className='px-2 py-0 text-xs font-semibold text-gray-500'>
                                {activePatient.insurance_type}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className='flex items-center justify-center'>
                        <div className='text-center py-2 rounded-[41px] bg-[#01F0D0] w-2/3'>
                          <a
                            className='text-black hover:underline font-medium text-sm px-3'
                            href='#'
                          >
                            Show All Information
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* diagnostic table */}

            <div className='grid grid-cols-1 lg:grid-cols-3 gap-6'>
              <div className='bg-white border border-gray-100 shadow-md shadow-black/5 p-0 rounded-md lg:col-span-2'>
                <div className='p-6 relative flex flex-col min-w-0 mb-4 lg:mb-0 break-words bg-gray-50  w-full shadow-lg rounded'>
                  <div className='rounded-t mb-0 px-0 border-0'>
                    <div className='flex flex-wrap items-center px-4 py-2'>
                      <div className='relative w-full max-w-full flex-grow flex-1'>
                        <h3 className='font-semibold text-base text-gray-900 '>
                          Diagnistic Lists
                        </h3>
                      </div>
                    </div>
                    <div className='block w-full overflow-x-auto'>
                      <table className='items-center w-full bg-transparent border-collapse'>
                        <thead className='rounded-[24px]'>
                          <tr>
                            <th className='px-4 bg-gray-100 text-gray-500 align-middle   py-3 text-xs   rounded-l-[24px] whitespace-nowrap font-semibold text-left'>
                              Problem/Diagnostic
                            </th>
                            <th className='px-4 bg-gray-100  text-gray-500  align-middle    py-3 text-xs border-0 whitespace-nowrap font-semibold text-left'>
                              Description
                            </th>
                            <th className='px-4 bg-gray-100  text-gray-500  align-middle  border-gray-200  py-3 text-xs  rounded-r-[24px] whitespace-nowrap font-semibold text-left min-w-140-px'>
                              Status
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          {activePatient.diagnostic_list.map((item, index) => {
                            return (
                              <tr className='text-gray-700' key={index}>
                                <th className='border-t-0 px-4 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left'>
                                  {item.name}
                                </th>
                                <td className='border-t-0 px-4 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4'>
                                  {item.description}
                                </td>
                                <td className='border-t-0 px-4 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4'>
                                  <div className='flex items-center'>
                                    <span className='mr-2'> {item.status}</span>
                                  </div>
                                </td>
                              </tr>
                            );
                          })}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
              <div className='bg-white border border-gray-100 shadow-md shadow-black/5 p-6 rounded-md'>
                <div className='flex justify-between mb-4 items-start'> </div>
                <div className='overflow-x-auto'>
                  {/* <table className='w-full min-w-[460px]'> */}
                  <table className='w-full'>
                    <thead>
                      <tr>
                        <th className='text-[12px] uppercase tracking-wide font-medium text-gray-400 py-2 px-4 bg-gray-50 text-left rounded-tl-md rounded-bl-md'>
                          Lab results
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {activePatient.lab_results.map((item, index) => {
                        return (
                          <tr
                            key={index}
                            className='flex flex-col hover:bg-gray-100 hover:bg-text-black'
                          >
                            <td className='py-2 border-b border-b-gray-50'>
                              <div className='flex items-center'>
                                <div className='flex justify-between items-between w-full'>
                                  <a
                                    href='#'
                                    className='text-gray-600 text-sm font-medium ml-2 truncate'
                                  >
                                    {item}
                                  </a>
                                  <img
                                    src='/icons/download.png'
                                    alt='download-icon'
                                    className='w-[20px] h-[20px] ml-2'
                                  />
                                </div>
                              </div>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </>
  );
};

export default Home;
