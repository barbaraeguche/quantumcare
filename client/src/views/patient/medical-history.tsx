import { useState } from 'react';
import { MedicalHistory as MedicalHistoryType } from '@/lib/definitions';
import CardLayout from '@/layouts/cards';
import CardHeader from '@/components/card-header';
import { Pagination, Accordion } from '@/ui/index';

export default function MedicalHistory({ medicalHistory }: {
	medicalHistory: MedicalHistoryType[]
}) {
	const [currentPage, setCurrentPage] = useState<number>(1);
	const itemsPerPage = 3;
	
	const paginatedHistory = medicalHistory.slice(
		(currentPage - 1) * itemsPerPage,
		currentPage * itemsPerPage
	);
	
	return (
		<CardLayout className={'max-w-[800px]'}>
			<div className={'flex justify-between m-0'}>
				<CardHeader title={'Medical History'}/>
				<Pagination
					itemsPerPage={itemsPerPage}
					currentPage={currentPage}
					setCurrentPage={setCurrentPage}
					arrayLength={medicalHistory.length}
				/>
			</div>
			
			<div className={'space-y-4 overflow-y-auto'}>
				{paginatedHistory.map((history) => (
					<CardLayout
						key={history._id}
						className={'max-w-full bg-white border'}
					>
						{/* header */}
						<div className={'text-sm font-medium flex justify-between items-center'}>
							<span>Medical Record</span>
							<span className={'text-gray-500'}>ID: {history._id}</span>
						</div>
						
						<div className={'space-y-6'}>
							{/* diagnosis */}
							<div>
								<h4 className={'font-semibold mb-2'}>Diagnosis Information</h4>
								<div className={'grid grid-cols-2 gap-4'}>
									<div>
										<p className={'text-sm text-gray-500'}>Diagnosis</p>
										<p>{history.diagnosis}</p>
									</div>
									<div>
										<p className={'text-sm text-gray-500'}>Diagnosis Date</p>
										<p>{history.diagnosisDate.toLocaleDateString()}</p>
									</div>
								</div>
							</div>
							
							{/* medication */}
							<div>
								<h4 className={'font-semibold'}>Medications</h4>
								{history.medications?.length !== 0 ? (
									<Medications history={history}/>
								) : (
									<p className={'text-sm '}>No medication prescribed.</p>
								)}
							</div>
						</div>
					</CardLayout>
				))}
			</div>
		</CardLayout>
	);
}

function Medications({ history }: {
	history: MedicalHistoryType
}) {
	return (
		<Accordion>
			{history.medications!.map((medication, idx) => (
				<Accordion.Item
					key={idx}
					value={`medication${idx}`}
				>
					<Accordion.Button>
						<div className={'flex justify-between items-center w-full pr-4'}>
							<span className={'font-medium'}>{medication.drugName}</span>
							<span className={'text-sm text-gray-500'}>{medication.dosage}</span>
						</div>
          </Accordion.Button>
					<Accordion.Content>
						<div className={'grid grid-cols-2 gap-4 p-4'}>
							<div>
								<p className={'text-sm text-gray-500'}>Drug Name</p>
								<p className={'font-medium'}>{medication.drugName}</p>
							</div>
							<div>
								<p className={'text-sm text-gray-500'}>Dosage</p>
								<p className={'font-medium'}>{medication.dosage}</p>
							</div>
							<div>
								<p className={'text-sm text-gray-500'}>Frequency</p>
								<p className={'font-medium'}>{medication.frequency}</p>
							</div>
							<div>
								<p className={'text-sm text-gray-500'}>Duration</p>
								<p className={'font-medium'}>{medication.duration}</p>
							</div>
						</div>
					</Accordion.Content>
				</Accordion.Item>
			))}
		</Accordion>
	);
}