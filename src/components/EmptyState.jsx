import illustration from '@/assets/illustrations/invoice_empty_stage.svg';

export const EmptyState = () => {
  return (
    <div className="flex flex-col items-center justify-center text-center mt-20 lg:mt-24 px-6">
      <div className="mb-10 lg:mb-16">
        <img 
          src={illustration} 
          alt="No invoices found" 
          className="w-48 lg:w-60"
        />
      </div>
      
      <h2 className="text-h-m text-content-primary mb-3">
        There is nothing here
      </h2>
      
      <p className="text-body-m text-content-tertiary max-w-[176px] md:max-w-[193px]">
        Create an invoice by clicking the <span className="font-bold inline md:hidden">New</span> <span className="font-bold hidden md:inline">New Invoice</span> button and get started
      </p>
    </div>
  );
};
