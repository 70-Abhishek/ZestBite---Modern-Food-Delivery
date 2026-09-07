import React from 'react';
import { Bell, CheckCircle2, Info, AlertTriangle, X, ShoppingBag } from 'lucide-react';
import { useFoodDelivery } from '../context/FoodDeliveryContext';

export const NotificationToastContainer: React.FC = () => {
  const { notifications, dismissNotification } = useFoodDelivery();

  const getIcon = (type: string) => {
    switch (type) {
      case 'order':
        return <ShoppingBag className="w-4 h-4 text-orange-600" />;
      case 'success':
        return <CheckCircle2 className="w-4 h-4 text-emerald-600" />;
      case 'warning':
        return <AlertTriangle className="w-4 h-4 text-amber-600" />;
      default:
        return <Info className="w-4 h-4 text-blue-600" />;
    }
  };

  return (
    <div className="fixed bottom-20 sm:bottom-6 right-4 sm:right-6 z-50 flex flex-col gap-2.5 max-w-sm w-full pointer-events-none">
      {(notifications || []).slice(-4).map((notif) => (
        <div
          key={notif.id}
          className="pointer-events-auto bg-white/95 backdrop-blur-md rounded-2xl border border-slate-200/90 p-3.5 shadow-xl flex items-start justify-between gap-3 animate-in slide-in-from-bottom-5 duration-200"
        >
          <div className="flex items-start gap-2.5">
            <div className="mt-0.5 w-7 h-7 rounded-xl bg-slate-50 flex items-center justify-center shrink-0 border border-slate-100">
              {getIcon(notif.type)}
            </div>
            <div>
              <h4 className="text-xs font-bold text-slate-900">{notif.title}</h4>
              <p className="text-[11px] text-slate-500 mt-0.5 leading-relaxed">{notif.message}</p>
            </div>
          </div>
          <button
            onClick={() => dismissNotification(notif.id)}
            className="text-slate-400 hover:text-slate-700 p-0.5 rounded-md shrink-0"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      ))}
    </div>
  );
};
