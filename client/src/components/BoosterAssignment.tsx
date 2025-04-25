import React, { useState } from 'react';
import { useGetOnlineBoostersQuery, useAssignBoosterToOrderMutation } from '../redux/api/orderApi';
import { toast } from 'react-hot-toast';
import { USER_ROLE_ENUM } from '../types/user';

// Define the type for online boosters based on the API response
interface OnlineBooster {
  userId: string;
  userName?: string;
  email?: string;
  avatar?: string;
  roles: USER_ROLE_ENUM[];
}

interface BoosterAssignmentProps {
  orderId: string;
  currentBooster?: string;
  onAssignmentComplete?: () => void;
}

export const BoosterAssignment: React.FC<BoosterAssignmentProps> = ({
  orderId,
  currentBooster,
  onAssignmentComplete,
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  // Pass an empty object as argument to the query hook
  const { data: boosters = [], isLoading: isLoadingBoosters } = useGetOnlineBoostersQuery({});
  const [assignBooster, { isLoading: isAssigning }] = useAssignBoosterToOrderMutation();

  const handleAssignBooster = async (boosterId: string) => {
    try {
      await assignBooster({ orderId, boosterId }).unwrap();
      toast.success('Booster assigned successfully');
      onAssignmentComplete?.();
    } catch (error: any) {
      toast.error(error?.data?.message || 'Failed to assign booster');
    }
  };

  // Type the boosters array with the OnlineBooster interface
  const filteredBoosters = (boosters as unknown as OnlineBooster[]).filter((booster) => {
    const searchLower = searchTerm.toLowerCase();
    return (
      booster.roles.includes(USER_ROLE_ENUM.BOOSTER) &&
      (booster.userName?.toLowerCase().includes(searchLower) ||
        booster.email?.toLowerCase().includes(searchLower))
    );
  });

  if (isLoadingBoosters) {
    return (
      <div className="flex items-center justify-center p-4">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-4 p-4">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold">Online Boosters</h3>
        <div className="relative">
          <input
            type="text"
            placeholder="Search boosters..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      {!filteredBoosters.length ? (
        <div className="text-center py-8 bg-gray-50 rounded-lg">
          <p className="text-gray-500">No online boosters available</p>
        </div>
      ) : (
        <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {filteredBoosters.map((booster) => (
            <div
              key={booster.userId}
              className={`p-4 border rounded-lg bg-white shadow-sm ${
                currentBooster === booster.userId ? 'border-blue-500' : ''
              }`}
            >
              <div className="flex items-center space-x-3">
                <div className="flex-shrink-0">
                  <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
                    {booster.avatar ? (
                      <img
                        src={booster.avatar}
                        alt={booster.userName}
                        className="w-10 h-10 rounded-full"
                      />
                    ) : (
                      <span className="text-blue-600 font-medium">
                        {booster.userName?.charAt(0)?.toUpperCase() || ''}
                      </span>
                    )}
                  </div>
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="font-medium truncate">{booster.userName}</h4>
                  <p className="text-sm text-gray-500 truncate">{booster.email}</p>
                  <div className="flex items-center mt-1">
                    <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-green-100 text-green-800">
                      Online
                    </span>
                  </div>
                </div>
                <button
                  onClick={() => handleAssignBooster(booster.userId)}
                  disabled={isAssigning || currentBooster === booster.userId}
                  className={`px-4 py-2 rounded-md text-sm font-medium ${
                    currentBooster === booster.userId
                      ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                      : 'bg-blue-600 text-white hover:bg-blue-700'
                  } disabled:opacity-50 disabled:cursor-not-allowed`}
                >
                  {isAssigning
                    ? 'Assigning...'
                    : currentBooster === booster.userId
                    ? 'Current Booster'
                    : 'Assign'}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};