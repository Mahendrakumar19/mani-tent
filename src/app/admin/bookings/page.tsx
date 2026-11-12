'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Booking } from '@/lib/bookings/types';

interface BookingStats {
  total: number;
  new: number;
  contacted: number;
  confirmed: number;
  completed: number;
  cancelled: number;
}

export default function AdminBookingsPage() {
  const router = useRouter();
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [stats, setStats] = useState<BookingStats | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [selectedStatus, setSelectedStatus] = useState<string>('');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);
  const [editingStatus, setEditingStatus] = useState('');
  const [editingNotes, setEditingNotes] = useState('');

  useEffect(() => {
    loadBookings();
  }, []);

  const loadBookings = async () => {
    try {
      setIsLoading(true);
      const response = await fetch('/api/admin/bookings');

      if (!response.ok) {
        if (response.status === 401) {
          router.push('/admin/login');
          return;
        }
        throw new Error('Failed to load bookings');
      }

      const data = await response.json();
      setBookings(data.bookings || []);
      setStats(data.stats);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error loading bookings');
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteBooking = async (id: string) => {
    if (!confirm('Are you sure you want to delete this booking?')) return;

    try {
      const response = await fetch(`/api/bookings/${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        setBookings((prev) => prev.filter((b) => b.id !== id));
        setSelectedBooking(null);
        await loadBookings();
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error deleting booking');
    }
  };

  const handleUpdateBooking = async () => {
    if (!selectedBooking) return;

    try {
      const response = await fetch(`/api/bookings/${selectedBooking.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          status: editingStatus,
          notes: editingNotes,
        }),
      });

      if (response.ok) {
        const updated = await response.json();
        setBookings((prev) =>
          prev.map((b) => (b.id === selectedBooking.id ? updated.booking : b))
        );
        setSelectedBooking(updated.booking);
        setError('');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error updating booking');
    }
  };

  const filteredBookings = bookings.filter((booking) => {
    const matchesStatus = !selectedStatus || booking.status === selectedStatus;
    const matchesSearch =
      booking.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      booking.phone.includes(searchTerm);
    return matchesStatus && matchesSearch;
  });

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-lg text-charcoal">Loading bookings...</p>
      </div>
    );
  }

  return (
    <div className="p-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-charcoal mb-2">Bookings</h1>
        <p className="text-charcoal/60">Manage all wedding booking requests</p>
      </div>

      {error && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700">
          {error}
        </div>
      )}

      {/* Stats Grid */}
      {stats && (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
          <StatCard label="Total" value={stats.total} />
          <StatCard label="New" value={stats.new} color="blue" />
          <StatCard label="Contacted" value={stats.contacted} color="yellow" />
          <StatCard label="Confirmed" value={stats.confirmed} color="green" />
          <StatCard label="Completed" value={stats.completed} color="purple" />
          <StatCard label="Cancelled" value={stats.cancelled} color="red" />
        </div>
      )}

      {/* Filters */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-semibold text-charcoal mb-2">
              Status Filter
            </label>
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="w-full px-4 py-2 border border-beige rounded-lg focus:outline-none focus:ring-2 focus:ring-gold"
            >
              <option value="">All Statuses</option>
              <option value="new">New</option>
              <option value="contacted">Contacted</option>
              <option value="confirmed">Confirmed</option>
              <option value="completed">Completed</option>
              <option value="cancelled">Cancelled</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-semibold text-charcoal mb-2">
              Search by Name or Phone
            </label>
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search bookings..."
              className="w-full px-4 py-2 border border-beige rounded-lg focus:outline-none focus:ring-2 focus:ring-gold"
            />
          </div>

          <div className="flex items-end">
            <button
              onClick={() => {
                setSelectedStatus('');
                setSearchTerm('');
              }}
              className="w-full px-4 py-2 bg-gray-200 text-charcoal rounded-lg hover:bg-gray-300 transition-colors"
            >
              Clear Filters
            </button>
          </div>
        </div>
      </div>

      {/* Bookings Table/List */}
      {filteredBookings.length === 0 ? (
        <div className="bg-white rounded-lg shadow-md p-12 text-center">
          <p className="text-lg text-charcoal/60">No bookings found</p>
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-charcoal text-ivory">
                <tr>
                  <th className="px-6 py-3 text-left text-sm font-semibold">
                    Name
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-semibold">
                    Phone
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-semibold">
                    Event Date
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-semibold">
                    Guest Count
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-semibold">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-semibold">
                    Received
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-semibold">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-beige">
                {filteredBookings.map((booking) => (
                  <tr
                    key={booking.id}
                    className="hover:bg-ivory transition-colors"
                  >
                    <td className="px-6 py-4 font-medium text-charcoal">
                      {booking.customerName}
                    </td>
                    <td className="px-6 py-4 text-charcoal">
                      <a
                        href={`tel:${booking.phone}`}
                        className="text-gold hover:underline"
                      >
                        {booking.phone}
                      </a>
                    </td>
                    <td className="px-6 py-4 text-charcoal">
                      {new Date(booking.eventDate).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 text-charcoal">
                      {booking.guestCount || '-'}
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusBadgeClass(
                          booking.status
                        )}`}
                      >
                        {booking.status.charAt(0).toUpperCase() +
                          booking.status.slice(1)}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-charcoal text-sm">
                      {new Date(booking.timestamp).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4">
                      <button
                        onClick={() => {
                          setSelectedBooking(booking);
                          setEditingStatus(booking.status);
                          setEditingNotes(booking.notes || '');
                        }}
                        className="text-gold hover:text-gold/70 font-medium"
                      >
                        View/Edit
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Detail Modal */}
      {selectedBooking && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-charcoal text-ivory p-6 flex justify-between items-center">
              <h2 className="text-2xl font-bold">Booking Details</h2>
              <button
                onClick={() => setSelectedBooking(null)}
                className="text-2xl hover:opacity-70"
              >
                ×
              </button>
            </div>

            <div className="p-6 space-y-6">
              {/* Customer Info */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-charcoal/60">
                    Name
                  </label>
                  <p className="text-lg text-charcoal font-medium">
                    {selectedBooking.customerName}
                  </p>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-charcoal/60">
                    Phone
                  </label>
                  <a
                    href={`tel:${selectedBooking.phone}`}
                    className="text-lg text-gold font-medium hover:underline"
                  >
                    {selectedBooking.phone}
                  </a>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-charcoal/60">
                    Email
                  </label>
                  <p className="text-charcoal">
                    {selectedBooking.email || '-'}
                  </p>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-charcoal/60">
                    Preferred Contact
                  </label>
                  <p className="text-charcoal capitalize">
                    {selectedBooking.preferredContact}
                  </p>
                </div>
              </div>

              <hr className="border-beige" />

              {/* Event Info */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-charcoal/60">
                    Event Date
                  </label>
                  <p className="text-charcoal">
                    {new Date(selectedBooking.eventDate).toLocaleDateString()}
                  </p>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-charcoal/60">
                    Event Type
                  </label>
                  <p className="text-charcoal">{selectedBooking.eventType}</p>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-charcoal/60">
                    Guest Count
                  </label>
                  <p className="text-charcoal">
                    {selectedBooking.guestCount || '-'}
                  </p>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-charcoal/60">
                    Budget Range
                  </label>
                  <p className="text-charcoal">
                    {selectedBooking.budgetRange || '-'}
                  </p>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-charcoal/60">
                    Honeycomb/Glamping
                  </label>
                  <p className="text-charcoal">
                    {selectedBooking.honeycombGlamping ? 'Yes' : 'No'}
                  </p>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-charcoal/60">
                    Date Received
                  </label>
                  <p className="text-charcoal">
                    {new Date(selectedBooking.timestamp).toLocaleDateString()}
                  </p>
                </div>
              </div>

              {selectedBooking.eventDetails && (
                <>
                  <hr className="border-beige" />
                  <div>
                    <label className="block text-sm font-semibold text-charcoal/60 mb-2">
                      Event Details
                    </label>
                    <p className="text-charcoal whitespace-pre-wrap">
                      {selectedBooking.eventDetails}
                    </p>
                  </div>
                </>
              )}

              {selectedBooking.additionalRequests && (
                <>
                  <hr className="border-beige" />
                  <div>
                    <label className="block text-sm font-semibold text-charcoal/60 mb-2">
                      Additional Requests
                    </label>
                    <p className="text-charcoal whitespace-pre-wrap">
                      {selectedBooking.additionalRequests}
                    </p>
                  </div>
                </>
              )}

              <hr className="border-beige" />

              {/* Status & Notes */}
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-charcoal mb-2">
                    Status
                  </label>
                  <select
                    value={editingStatus}
                    onChange={(e) => setEditingStatus(e.target.value)}
                    className="w-full px-4 py-2 border border-beige rounded-lg focus:outline-none focus:ring-2 focus:ring-gold"
                  >
                    <option value="new">New</option>
                    <option value="contacted">Contacted</option>
                    <option value="confirmed">Confirmed</option>
                    <option value="completed">Completed</option>
                    <option value="cancelled">Cancelled</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-charcoal mb-2">
                    Admin Notes
                  </label>
                  <textarea
                    value={editingNotes}
                    onChange={(e) => setEditingNotes(e.target.value)}
                    placeholder="Add internal notes about this booking..."
                    rows={4}
                    className="w-full px-4 py-2 border border-beige rounded-lg focus:outline-none focus:ring-2 focus:ring-gold"
                  />
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-4 pt-4">
                <button
                  onClick={handleUpdateBooking}
                  className="flex-1 px-6 py-2 bg-gold text-charcoal font-semibold rounded-lg hover:bg-gold/90 transition-colors"
                >
                  Save Changes
                </button>
                <a
                  href={`https://wa.me/${selectedBooking.phone}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 px-6 py-2 bg-green-500 text-white font-semibold rounded-lg hover:bg-green-600 transition-colors text-center"
                >
                  WhatsApp
                </a>
                <button
                  onClick={() => handleDeleteBooking(selectedBooking.id)}
                  className="flex-1 px-6 py-2 bg-red-500 text-white font-semibold rounded-lg hover:bg-red-600 transition-colors"
                >
                  Delete
                </button>
                <button
                  onClick={() => setSelectedBooking(null)}
                  className="flex-1 px-6 py-2 bg-gray-300 text-charcoal font-semibold rounded-lg hover:bg-gray-400 transition-colors"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function StatCard({
  label,
  value,
  color = 'gray',
}: {
  label: string;
  value: number;
  color?: string;
}) {
  const colorClasses: Record<string, string> = {
    blue: 'bg-blue-50 text-blue-700 border-blue-200',
    yellow: 'bg-yellow-50 text-yellow-700 border-yellow-200',
    green: 'bg-green-50 text-green-700 border-green-200',
    purple: 'bg-purple-50 text-purple-700 border-purple-200',
    red: 'bg-red-50 text-red-700 border-red-200',
    gray: 'bg-gray-50 text-gray-700 border-gray-200',
  };

  return (
    <div className={`p-4 border rounded-lg ${colorClasses[color]}`}>
      <p className="text-sm font-medium opacity-70">{label}</p>
      <p className="text-3xl font-bold">{value}</p>
    </div>
  );
}

function getStatusBadgeClass(status: string): string {
  const classes: Record<string, string> = {
    new: 'bg-blue-100 text-blue-800',
    contacted: 'bg-yellow-100 text-yellow-800',
    confirmed: 'bg-green-100 text-green-800',
    completed: 'bg-purple-100 text-purple-800',
    cancelled: 'bg-red-100 text-red-800',
  };
  return classes[status] || 'bg-gray-100 text-gray-800';
}
