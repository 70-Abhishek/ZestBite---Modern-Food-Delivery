import React, { useState } from 'react';
import { 
  X, 
  Sparkles, 
  Gift, 
  Award, 
  Check, 
  ChevronRight, 
  Share2, 
  Copy, 
  CheckCheck,
  Star,
  Zap,
  Crown
} from 'lucide-react';
import { useFoodDelivery } from '../context/FoodDeliveryContext';
import { DEFAULT_LOYALTY_REWARDS } from '../data/mockData';

interface LoyaltyRewardsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const LoyaltyRewardsModal: React.FC<LoyaltyRewardsModalProps> = ({ isOpen, onClose }) => {
  const { loyalty, redeemReward, addNotification } = useFoodDelivery();
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const rewardsList = loyalty?.availableRewards || DEFAULT_LOYALTY_REWARDS;

  const handleCopyReferral = () => {
    navigator.clipboard.writeText('https://zestbite.app/join?ref=ALEX749');
    setCopied(true);
    addNotification('Referral Link Copied 📋', 'Share with friends for 250 bonus points each!', 'info');
    setTimeout(() => setCopied(false), 2500);
  };

  const handleRedeem = (rewardId: string) => {
    const res = redeemReward(rewardId);
    if (!res.success) {
      addNotification('Rewards', res.message, 'warning');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/70 backdrop-blur-xs animate-in fade-in duration-200">
      <div 
        className="bg-white rounded-3xl w-full max-w-xl overflow-hidden shadow-2xl border border-slate-100 flex flex-col max-h-[90vh] animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header with Gold Gradient */}
        <div className="relative p-6 bg-gradient-to-br from-amber-500 via-orange-500 to-amber-600 text-white shrink-0">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-8 h-8 rounded-full bg-black/20 hover:bg-black/40 text-white flex items-center justify-center backdrop-blur-md transition-colors"
          >
            <X className="w-4 h-4" />
          </button>

          <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-amber-200 mb-1">
            <Crown className="w-4 h-4" />
            <span>ZestBite VIP Rewards</span>
          </div>

          <div className="flex items-baseline justify-between mt-2">
            <div>
              <p className="text-3xl sm:text-4xl font-black">{loyalty.points.toLocaleString()} <span className="text-xl font-bold">pts</span></p>
              <p className="text-xs text-amber-100 mt-0.5">Active Tier: <strong className="text-white">{loyalty.tier} Member</strong></p>
            </div>
            <div className="text-right">
              <span className="px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-xs font-bold">
                10 pts per $1 spent
              </span>
            </div>
          </div>

          {/* Progress to Next Tier */}
          <div className="mt-4 bg-black/20 rounded-2xl p-3 backdrop-blur-sm space-y-1.5">
            <div className="flex justify-between text-[11px] font-bold text-amber-100">
              <span>Next Level: Platinum Tier</span>
              <span>{loyalty.nextTierPoints - loyalty.points} pts away</span>
            </div>
            <div className="w-full h-2 bg-white/20 rounded-full overflow-hidden">
              <div 
                className="h-full bg-white rounded-full transition-all duration-500"
                style={{ width: `${(loyalty.points / loyalty.nextTierPoints) * 100}%` }}
              />
            </div>
          </div>
        </div>

        {/* Scrollable Perks & Redeemable catalog */}
        <div className="p-5 sm:p-6 overflow-y-auto space-y-6 flex-1">
          
          {/* Active VIP Perks */}
          <div className="space-y-3">
            <h3 className="text-xs font-extrabold uppercase tracking-wider text-slate-800 flex items-center gap-1.5">
              <Zap className="w-4 h-4 text-amber-500" />
              Your Gold Tier Privileges
            </h3>
            <div className="grid grid-cols-2 gap-2 text-xs">
              <div className="p-3 bg-amber-50/50 border border-amber-200/60 rounded-2xl flex items-center gap-2">
                <Check className="w-4 h-4 text-amber-600 shrink-0" />
                <span className="font-semibold text-amber-950">Free Priority Courier Routing</span>
              </div>
              <div className="p-3 bg-amber-50/50 border border-amber-200/60 rounded-2xl flex items-center gap-2">
                <Check className="w-4 h-4 text-amber-600 shrink-0" />
                <span className="font-semibold text-amber-950">Surprise Birthday Dessert</span>
              </div>
              <div className="p-3 bg-amber-50/50 border border-amber-200/60 rounded-2xl flex items-center gap-2">
                <Check className="w-4 h-4 text-amber-600 shrink-0" />
                <span className="font-semibold text-amber-950">Exclusive Secret Menus</span>
              </div>
              <div className="p-3 bg-amber-50/50 border border-amber-200/60 rounded-2xl flex items-center gap-2">
                <Check className="w-4 h-4 text-amber-600 shrink-0" />
                <span className="font-semibold text-amber-950">Zero Surge Fees</span>
              </div>
            </div>
          </div>

          {/* Catalog of Redeemable Rewards */}
          <div className="space-y-3 pt-2 border-t border-slate-100">
            <h3 className="text-xs font-extrabold uppercase tracking-wider text-slate-800 flex items-center gap-1.5">
              <Gift className="w-4 h-4 text-orange-600" />
              Redeem Points for Vouchers
            </h3>

            <div className="space-y-2.5">
              {rewardsList.map((reward) => {
                const canAfford = (loyalty?.points ?? 0) >= reward.pointsCost;

                return (
                  <div 
                    key={reward.id} 
                    className="p-3.5 bg-slate-50 border border-slate-200/80 rounded-2xl flex items-center justify-between gap-3"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-orange-100 text-orange-600 flex items-center justify-center shrink-0">
                        <Gift className="w-5 h-5" />
                      </div>
                      <div>
                        <h4 className="text-xs font-bold text-slate-900">{reward.title}</h4>
                        <p className="text-[11px] text-slate-500">{reward.description}</p>
                        <span className="text-[10px] font-extrabold text-amber-600">
                          {reward.pointsCost} points
                        </span>
                      </div>
                    </div>

                    <button
                      onClick={() => handleRedeem(reward.id)}
                      disabled={!canAfford}
                      className={`px-3.5 py-1.5 rounded-xl font-bold text-xs transition-all shrink-0 ${
                        canAfford 
                          ? 'bg-orange-600 hover:bg-orange-700 text-white shadow-xs active:scale-95 cursor-pointer' 
                          : 'bg-slate-200 text-slate-400 cursor-not-allowed'
                      }`}
                    >
                      {canAfford ? 'Redeem' : 'Need more pts'}
                    </button>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Referral Card */}
          <div className="p-4 rounded-2xl bg-gradient-to-r from-orange-50 to-amber-50 border border-orange-200/70 flex flex-col sm:flex-row items-center justify-between gap-3">
            <div>
              <h4 className="text-xs font-bold text-slate-900">Invite a Fellow Foodie</h4>
              <p className="text-[11px] text-slate-600">Both of you get 250 points upon their first completed meal.</p>
            </div>
            <button
              onClick={handleCopyReferral}
              className="px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs flex items-center gap-1.5 shrink-0 transition-colors"
            >
              {copied ? <CheckCheck className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? 'Link Copied!' : 'Copy Invite Link'}</span>
            </button>
          </div>

        </div>
      </div>
    </div>
  );
};
