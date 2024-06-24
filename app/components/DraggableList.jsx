'use client';

import {useState, useRef} from 'react'

const DraggableList = () => {

    const [events, setEvents] = useState([
        {id: 1, name: 'Meeting with CEO', date: '04 Jun 2024',time: '12:30 PM',  description: 'Important meeting to discuss about plans.', location: 'Conference Room A'},
        {id: 2, name: 'Team Meeting', date: '05 Jun 2024',time: '10:00 AM', description: 'Monthly team meeting to discuss project updates.', location: 'Conference Room C'},
        {id: 3, name: 'Dinner with Julie', date: '08 Jun 2024',time: '8:00 PM', description: 'Dinner with Julie at 8:00', location: 'Seattle'},
    ])

    const dragEvent = useRef(0)
    const draggedOverEvent = useRef(0)

    function handleSort() {
        const eventsClone = [...events]
        const temp = eventsClone[dragEvent.current]
        eventsClone[dragEvent.current] = eventsClone[draggedOverEvent.current]
        eventsClone[draggedOverEvent.current] = temp
        setEvents(eventsClone)
    }

    return (
        <div className='h-screen w-screen flex flex-col items-center justify-center gap-10'>
            <h1 className='text-5xl font-black'>YOUR SCHEDULED EVENTS</h1>
            <div className='flex flex-col gap-4'>
            {events.map((event, index) => (
                <div 
                draggable 
                onDragStart={() => (dragEvent.current = index)}
                onDragEnter={() => (draggedOverEvent.current = index)}
                onDragEnd={handleSort}
                onDragOver={(e) => e.preventDefault()}
                className='bg-[#f6f5f9] rounded-3xl px-6 py-3 flex flex-col gap-1 relative cursor-grab' key={event.id}>
                    <div className='flex text-black items-center justify-between '>
                        <div>
                            <p className='text-3xl font-bold'>{event.name}</p>
                            <p className='font-medium'>{event.time}</p>
                        </div>
                        <div>
                            <p className='font-semibold text-md mt-6'>at {event.date}</p>
                            <div className='w-full bg-gray-600 h-[2px]'/>
                        </div>
                    </div>
                    <div className='w-full h-[1px] bg-gray-400'/>
                    <p className='text-black font-semibold'>{event.location}</p>
                    <p className='text-lg text-black font-semibold'>{event.description}</p>
                </div>
            ))}
        </div>
        </div>
    )
}

export default DraggableList