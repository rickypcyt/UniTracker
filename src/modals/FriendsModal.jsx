import React, { useState } from 'react';

import BaseModal from './BaseModal';
import { Trash2 } from 'lucide-react';

const FriendDetailModal = ({ isOpen, onClose, friend, sharedWorkspaces }) => {
  if (!friend) return null;
  return (
    <BaseModal isOpen={isOpen} onClose={onClose} title={friend.username || friend.email || 'Friend'} maxWidth="max-w-sm">
      <div className="flex flex-col items-center gap-4 py-4">
        <img
          src={friend.avatar_url || '/public/assets/apple-touch-icon.png'}
          alt={friend.username || friend.email || 'Avatar'}
          className="w-20 h-20 rounded-full object-cover border-2 border-[var(--accent-primary)] bg-[var(--bg-primary)]"
        />
        <div className="text-lg font-semibold text-[var(--text-primary)]">{friend.username || friend.email || friend.id}</div>
        <div className="text-sm text-[var(--text-secondary)]">{friend.email}</div>
        <div className="w-full mt-4">
          <span className="font-semibold text-[var(--accent-primary)]">Shared Workspaces:</span>
          <ul className="list-disc ml-5 mt-2">
            {(sharedWorkspaces?.length > 0)
              ? sharedWorkspaces.map(ws => (
                  <li key={ws.id} className="text-[var(--text-primary)]">{ws.name}</li>
                ))
              : <li className="text-[var(--text-secondary)]">No shared workspaces</li>}
          </ul>
        </div>
      </div>
    </BaseModal>
  );
};

const FriendsModal = ({ isOpen, onClose, friends = [], onRemoveFriend, sharedWorkspaces = {} }) => {
  const [selected, setSelected] = useState(null); // amigo seleccionado para modal

  return (
    <>
      <BaseModal isOpen={isOpen} onClose={onClose} title="Friends" maxWidth="max-w-md">
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-[var(--text-primary)] mb-2">Your Friends</h3>
          {friends.length === 0 ? (
            <div className="text-[var(--text-secondary)] text-center">You have no friends yet.</div>
          ) : (
            <ul className="space-y-2">
              {friends.map((friend) => (
                <li key={friend.id}>
                  <div
                    className="flex items-center gap-3 p-3 rounded-lg border border-[var(--border-primary)] bg-[var(--bg-secondary)] shadow-sm cursor-pointer transition hover:bg-[var(--bg-primary)]"
                    onClick={() => setSelected(friend)}
                    tabIndex={0}
                    role="button"
                  >
                    <img
                      src={friend.avatar_url || '/public/assets/apple-touch-icon.png'}
                      alt={friend.username || friend.email || 'Avatar'}
                      className="w-10 h-10 rounded-full object-cover border-2 border-[var(--accent-primary)] bg-[var(--bg-primary)]"
                    />
                    <div className="flex-1 min-w-0">
                      <div className="font-medium text-[var(--text-primary)] truncate">{friend.username || friend.email || friend.id}</div>
                      <div className="text-xs text-[var(--text-secondary)] truncate">{friend.email}</div>
                    </div>
                    {onRemoveFriend && (
                      <button
                        className="p-2 rounded-full hover:bg-red-500/20 text-red-500 hover:text-red-700 transition-colors"
                        onClick={e => { e.stopPropagation(); onRemoveFriend(friend); }}
                        title="Remove friend"
                      >
                        <Trash2 size={18} />
                      </button>
                    )}
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </BaseModal>
      {/* Modal de detalle de amigo */}
      <FriendDetailModal
        isOpen={!!selected}
        onClose={() => setSelected(null)}
        friend={selected}
        sharedWorkspaces={selected ? sharedWorkspaces[selected.id] : []}
      />
    </>
  );
};

export default FriendsModal; 