'use client'
import { Calendar } from "@/components/ui/calendar"
import { Button } from "@/components/ui/button"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Calendar as CalendarIcon } from "lucide-react"
import { format } from "date-fns"
import { id } from "date-fns/locale"
import { DateRange } from "react-day-picker"

interface DataRangePickerProps {
  dateRange?: DateRange
  onSelect: (range?: DateRange) => void
  className?: string
}

export function DataRangePicker({ 
  dateRange, 
  onSelect,
  className
}: DataRangePickerProps) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          className={`w-full justify-start text-left font-normal bg-[#1e1e1e] border-[#2e2e2e] hover:bg-[#2e2e2e] hover:text-gray-100 ${className}`}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {dateRange?.from ? (
            dateRange.to ? (
              <>
                {format(dateRange.from, 'dd MMM yyyy', { locale: id })} -{' '}
                {format(dateRange.to, 'dd MMM yyyy', { locale: id })}
              </>
            ) : (
              format(dateRange.from, 'dd MMM yyyy', { locale: id })
            )
          ) : (
            <span>Pilih rentang tanggal</span>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0 bg-[#1e1e1e] border-[#2e2e2e]" align="start">
        <Calendar
          mode="range"
          selected={dateRange}
          onSelect={onSelect}
          numberOfMonths={2}
          className="bg-[#1e1e1e] text-gray-100"
          styles={{
            day: {
              color: '#f3f4f6',
            },
            head_cell: {
              color: '#9ca3af',
            },
            nav_button: {
              backgroundColor: '#2e2e2e',
            }
          }}
        />
      </PopoverContent>
    </Popover>
  )
}