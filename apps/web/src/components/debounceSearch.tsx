'use client';
import * as React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import axios from 'axios';
import { convertDate } from '@/lib/text';
import { rupiah } from '@/lib/text';
import { useDebounce } from 'use-debounce';
import { trimText } from '@/lib/text';
import { Search } from 'lucide-react';

interface IDebounceSearchProps { }

const DebounceSearch: React.FunctionComponent<IDebounceSearchProps> = (
  props,
) => {
  const [search, setSearch] = React.useState<string>('');
  const [dataSearch, setDataSearch] = React.useState<any[] | null>([]);

  const [debounceValue] = useDebounce(search, 1200);

  React.useEffect(() => {
    getDataSearch();
  }, [debounceValue]);

  const getDataSearch = async () => {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_BASE_API_URL}event/${debounceValue}`,
      );
      console.log(response.data);
      setDataSearch(response.data.result);
    } catch (error) {
      console.log('error');
    }
  };

  const mappingDataSearch = () => {
    return dataSearch?.map((val: any, idx: number) => {
      return (
        <div
          className="w-full h-[100px] flex border-t-1 border-b-1 border-t border-b items-center gap-3"
          key={idx}
        >
          <div className="w-[160px] h-[80px] bg-gray-400 rounded-md hidden md:block"></div>
          <div>
            <p className="md:text-lg font-medium">{trimText(val?.title, 40)}</p>
            <div className="flex items-center gap-1 text-xs text-gray-400">
              <p>{convertDate(val?.start_date)}</p>
              <p>-</p>
              <p>{convertDate(val?.end_date)}</p>
            </div>
            <p className="text-sm">{rupiah(val?.price)}</p>
          </div>
        </div>
      );
    });
  };
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline">
          <span className="mr-2">
            <Search className="w-4 h-4"></Search>
          </span>
          Search your event here
        </Button>
      </SheetTrigger>
      <SheetContent
        className="bg-white w-[320px] md:w-[680px] top-0 min-h-screen"
        side={'bottom'}
      >
        <SheetHeader>
          <SheetTitle>Find</SheetTitle>
          <SheetDescription>
            Search your event and get your ticket..
          </SheetDescription>
        </SheetHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center">
            <Input
              id="name"
              className="col-span-3"
              type="text"
              onChange={(e) => {
                setSearch(e.target.value);
              }}
            />
          </div>
          {search == '' ? (
            <div className="w-full h-[490px] md:h-[770px] flex flex-col items-center justify-center bg-gray-100 rounded-md gap-5">
              <Search className="w-[80px] h-[80px] text-gray-300"></Search>
              <p className="text-xs text-gray-400">Search here</p>
            </div>
          ) : (
            <div className="w-full h-[490px] md:h-[770px] overflow-x-hidden">
              <div className="h-fit">{mappingDataSearch()}</div>
            </div>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default DebounceSearch;
