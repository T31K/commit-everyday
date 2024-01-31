// return (
//   <main className="py-12">
//     <div className="flex flex-col gap-4">
//       <div className="grid grid-cols-1 gap-4">
//         <div className="bg-gray-100 border-[1.4px] border-gray-200 h-[60px] rounded-xl flex flex gap-3 px-8 items-center justify-between">
//           <Select onValueChange={handleYearChange}>
//             <SelectTrigger className="w-[180px]">
//               <SelectValue placeholder="2024" />
//             </SelectTrigger>
//             <SelectContent>
//               <SelectItem value="2024">2024</SelectItem>
//               <SelectItem value="2023">2023</SelectItem>
//               <SelectItem value="2022">2022</SelectItem>
//               <SelectItem value="2021">2021</SelectItem>
//             </SelectContent>
//           </Select>
//           <div className="p-6 rounded-lg flex flex gap-2 items-center justify-center">
//             <p className="text-sm font-semibold tracking-wide  text-gray-600">{pathname.substring(1)}</p>
//             <div
//               // href={`https://github.com${pathname}`}
//               // target="_blank"
//               onClick={fetchTopLanguages}
//             >
//               <IconUserSquareRounded
//                 size={24}
//                 style={{ color: tailwindColors[activeColor]['400'] }}
//                 className="hover:cursor-pointer mr-1"
//                 stroke="2"
//               />
//             </div>
//           </div>
//           <ColorPicker
//             activeColor={activeColor}
//             setActiveColor={setActiveColor}
//           />
//         </div>{' '}
//       </div>
//       <div className="flex gap-4 ">
//         <div className="w-full h-[220px] bg-gray-100 border-[1.4px] border-gray-200 rounded-xl flex items-center justify-center ">
//           <ContributionGraph
//             contributionsData={contributionsData}
//             activeColor={activeColor}
//           />
//         </div>
//       </div>
//       <div className="grid grid-cols-3 gap-4">
//         <div className="bg-gray-100 border-[1.4px] border-gray-200 h-[220px] rounded-xl flex flex-col gap-3 items-center justify-center">
//           <div className="p-6 max-w-sm rounded-lg flex flex-col gap-2 items-center justify-center">
//             <p className="text-sm font-semibold tracking-wide  text-gray-600">Streak</p>
//             <div className="flex">
//               <IconFlame
//                 size={72}
//                 className="fill-current"
//                 style={{ color: tailwindColors[activeColor]['400'] }}
//                 stroke="none"
//               />
//             </div>
//             <p className="text-sm font-semibold text-gray-600"> {stats?.streak} days</p>
//           </div>
//         </div>{' '}
//         <div className="bg-gray-100 border-[1.4px] border-gray-200 h-[220px] rounded-xl flex flex-col gap-3 items-center justify-center">
//           <div className="p-6 max-w-sm rounded-lg flex flex-col gap-2 items-center justify-center">
//             <p className="text-sm font-semibold tracking-wide  text-gray-600">Highest</p>
//             <h3
//               className="text-7xl font-extrabold"
//               style={{ color: tailwindColors[activeColor]['400'] }}
//             >
//               {stats?.highest}
//             </h3>
//             <p className="text-sm font-semibold text-gray-600">commits per day</p>
//           </div>
//         </div>
//         <div className="bg-gray-100 border-[1.4px] border-gray-200 h-[220px] rounded-xl flex flex-col gap-3 items-center justify-center">
//           <div className="p-6 max-w-sm rounded-lg flex flex-col gap-2 items-center justify-center">
//             <p className="text-sm font-semibold tracking-wide  text-gray-600">Average</p>
//             <h3
//               className="text-7xl font-extrabold"
//               style={{ color: tailwindColors[activeColor]['400'] }}
//             >
//               {`${stats?.median}`.substring(0, 4)}
//             </h3>
//             <p className="text-sm font-semibold text-gray-600">commits per day</p>
//           </div>
//         </div>
//       </div>

//       <div className="grid grid-cols-3 gap-4">
//         <div className="bg-gray-100 border-[1.4px] border-gray-200 h-[220px] rounded-xl col-span-2  overflow-hidden">
//           <ResponsiveContainer
//             width="100%"
//             height="100%"
//             className="rounded-b-lg pt-5"
//           >
//             <div className="flex items-center justify-center gap-2">
//               <IconSquareRoundedArrowLeft
//                 size={28}
//                 className="text-slate-400 " // This applies the gradient fill
//                 stroke="1.3" // This removes the stroke if it's not needed
//                 onClick={() => handleArrow('left')}
//               />
//               <p className="text-sm font-semibold text-gray-600 text-center">{`Week ${activeWeek + 1}`}</p>

//               <IconSquareRoundedArrowRight
//                 onClick={() => handleArrow('right')}
//                 size={28}
//                 className="text-slate-400 " // This applies the gradient fill
//                 stroke="1.5" // This removes the stroke if it's not needed
//               />
//             </div>

//             <AreaChart
//               data={stats?.weeklyChart}
//               className="mb-5"
//               margin={{
//                 right: 0,
//                 left: 0,
//               }}
//             >
//               <Area
//                 type="basis"
//                 dataKey="count"
//                 isAnimationActive
//                 stroke={tailwindColors[activeColor]['600']}
//                 fill={tailwindColors[activeColor]['200']}
//               />
//             </AreaChart>
//           </ResponsiveContainer>
//         </div>
//         {/* leader boards */}
//         {/* <div className="bg-gray-100 border-[1.4px] border-gray-200 h-[220px] rounded-xl items-center col-span-1 justify-center">
//           <div className="rounded-lg flex flex-col gap-2 items-center justify-center w-full h-full ">
//             <div className="w-[60%] bg-blue-200 rounded-full py-2 px-3 flex justify-between items-center">
//               <div className="w-[30px] h-[30px] bg-white border-2 border-gray-400 rounded-full flex items-center justify-center font-semibold text-gray-500">
//                 1
//               </div>
//               <p className="text-md tracking-tight font-semibold text-gray-600">T31K</p>
//               <div className="invisible w-[30px] h-[30px] bg-white border-2 border-gray-400 rounded-full flex items-center justify-center font-semibold text-gray-500">
//                 1
//               </div>
//             </div>
//             <div className="w-[50%] bg-blue-100 rounded-full py-2 px-3">
//               <div className="w-[30px] h-[30px] bg-white border-2 border-gray-300 rounded-full flex items-center justify-center font-semibold text-gray-500">
//                 2
//               </div>
//             </div>
//             <div className="w-[50%] bg-blue-100 rounded-full py-2 px-3">
//               <div className="w-[30px] h-[30px] bg-white border-2 border-gray-300 rounded-full flex items-center justify-center font-semibold text-gray-500">
//                 3
//               </div>
//             </div>{' '}
//           </div>
//         </div> */}

//         <div className="bg-gray-100 border-[1.4px] border-gray-200 h-[220px] rounded-xl flex flex-col gap-3 items-center justify-center">
//           <div className="p-6 max-w-sm rounded-lg flex flex-col gap-2 items-center justify-center">
//             <div className="w-full">
//               <p className="text-sm font-semibold tracking-wide  text-gray-600">Rank {stats?.rank + 1}</p>

//               <div
//                 className="w-[200px] h-[5px] rounded-full mt-1"
//                 style={{ background: tailwindColors[activeColor]['200'] }}
//               >
//                 <div
//                   className="h-[5px] rounded-full mt-1"
//                   style={{ background: tailwindColors[activeColor]['400'], width: `${(stats?.rank + 1) * 10}%` }}
//                 />
//               </div>
//             </div>
//             <h3
//               className="text-3xl font-extrabold whitespace-nowrap"
//               style={{ color: tailwindColors[activeColor]['400'] }}
//             >
//               {ranks[stats?.rank]?.name}
//             </h3>
//           </div>
//         </div>
//       </div>
//     </div>
//   </main>
// );
