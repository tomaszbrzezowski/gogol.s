import React, { useState } from 'react';
import { Calendar, Clock, Users, Hotel, Search, Filter, ChevronDown, ChevronUp, Edit, Save, X, Image, FileText, BarChart3, Settings } from 'lucide-react';
import { motion } from 'framer-motion';
import { supabase } from '../lib/supabase';
import { format } from 'date-fns';
import { useRequireAuth, signOut } from '../lib/auth';
import type { SaltCaveReservation, MotelReservation, SiteContent, SiteImage, ReservationStats } from '../lib/supabase';
import { sendConfirmationEmail, formatTime } from '../lib/email';

const STATUSES = ['pending', 'confirmed', 'cancelled'] as const;

const SALT_CAVE_TICKET_TYPES = [
  { id: 'normal', name: 'Bilet Normalny', price: 21 },
  { id: 'reduced', name: 'Bilet Ulgowy', price: 17 },
  { id: 'normal-pass', name: 'Karnet Normalny', price: 180 },
  { id: 'reduced-pass', name: 'Karnet Ulgowy', price: 140 },
  { id: 'family-1-1', name: 'Karnet 1+1', price: 288 },
  { id: 'family-2-1', name: 'Karnet 2+1', price: 450 },
  { id: 'family-2-2', name: 'Karnet 2+2', price: 576 }
];

const Admin = () => {
  const { user } = useRequireAuth();
  const [activeTab, setActiveTab] = useState<'dashboard' | 'saltCave' | 'motel' | 'content' | 'images'>('dashboard');
  const [reservations, setReservations] = useState<(SaltCaveReservation | MotelReservation)[]>([]);
  const [siteContent, setSiteContent] = useState<SiteContent[]>([]);
  const [siteImages, setSiteImages] = useState<SiteImage[]>([]);
  const [stats, setStats] = useState<ReservationStats[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [sortField, setSortField] = useState<string>('created_at');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('desc');
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<typeof STATUSES[number] | 'all'>('all');
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);
  const [editingContentId, setEditingContentId] = useState<string | null>(null);
  const [editingContent, setEditingContent] = useState<Partial<SiteContent>>({});

  const handleSignOut = async () => {
    try {
      await signOut();
      // Navigation will be handled by useRequireAuth hook
    } catch (err) {
      console.error('Error signing out:', err);
      setError('Wystąpił błąd podczas wylogowywania');
    }
  };

  React.useEffect(() => {
    if (activeTab === 'dashboard') {
      fetchStats();
    } else if (activeTab === 'saltCave' || activeTab === 'motel') {
      fetchReservations();
    } else if (activeTab === 'content') {
      fetchSiteContent();
    } else if (activeTab === 'images') {
      fetchSiteImages();
    }
  }, [activeTab]);

  const fetchStats = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const { data, error } = await supabase
        .from('reservation_stats')
        .select('*');

      if (error) {
        console.error('Error fetching stats:', error);
        setError('Nie można pobrać statystyk.');
        return;
      }

      setStats(data || []);
    } catch (err) {
      console.error('Error fetching stats:', err);
      setError('Wystąpił błąd podczas pobierania statystyk');
    } finally {
      setLoading(false);
    }
  };

  const fetchReservations = async () => {
    setLoading(true);
    setError(null);

    try {
      const { data, error } = await supabase
        .from(activeTab === 'saltCave' ? 'salt_cave_reservations' : 'motel_reservations')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching reservations:', error);
        setError('Nie można pobrać rezerwacji. Spróbuj ponownie później.');
        return;
      }

      setReservations(data || []);
    } catch (err) {
      console.error('Error fetching reservations:', err);
      setError('Wystąpił błąd podczas pobierania rezerwacji');
    } finally {
      setLoading(false);
    }
  };

  const fetchSiteContent = async () => {
    setLoading(true);
    setError(null);

    try {
      const { data, error } = await supabase
        .from('site_content')
        .select('*')
        .order('section', { ascending: true });

      if (error) {
        console.error('Error fetching site content:', error);
        setError('Nie można pobrać treści strony.');
        return;
      }

      setSiteContent(data || []);
    } catch (err) {
      console.error('Error fetching site content:', err);
      setError('Wystąpił błąd podczas pobierania treści strony');
    } finally {
      setLoading(false);
    }
  };

  const fetchSiteImages = async () => {
    setLoading(true);
    setError(null);

    try {
      const { data, error } = await supabase
        .from('site_images')
        .select('*')
        .order('section', { ascending: true });

      if (error) {
        console.error('Error fetching site images:', error);
        setError('Nie można pobrać zdjęć strony.');
        return;
      }

      setSiteImages(data || []);
    } catch (err) {
      console.error('Error fetching site images:', err);
      setError('Wystąpił błąd podczas pobierania zdjęć strony');
    } finally {
      setLoading(false);
    }
  };

  const handleSort = (field: string) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  const filteredAndSortedReservations = React.useMemo(() => {
    let filtered = [...reservations];

    // Apply search filter
    if (searchTerm) {
      filtered = filtered.filter(res => 
        res.customer_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        res.customer_email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        res.customer_phone.includes(searchTerm)
      );
    }

    // Apply status filter
    if (statusFilter !== 'all') {
      filtered = filtered.filter(res => res.status === statusFilter);
    }

    // Sort
    return filtered.sort((a, b) => {
      const aValue = a[sortField as keyof typeof a];
      const bValue = b[sortField as keyof typeof b];
      
      if (typeof aValue === 'string' && typeof bValue === 'string') {
        return sortDirection === 'asc' 
          ? aValue.localeCompare(bValue)
          : bValue.localeCompare(aValue);
      }
      
      return sortDirection === 'asc' 
        ? (aValue > bValue ? 1 : -1)
        : (bValue > aValue ? 1 : -1);
    });
  }, [reservations, searchTerm, statusFilter, sortField, sortDirection]);

  const handleStatusChange = async (id: string, newStatus: typeof STATUSES[number]) => {
    try {
      // Get the current reservation
      const { data: currentReservation, error: fetchError } = await supabase
        .from(activeTab === 'saltCave' ? 'salt_cave_reservations' : 'motel_reservations')
        .select('*')
        .eq('id', id)
        .single();

      if (fetchError) throw fetchError;

      // Update the status
      const { error } = await supabase
        .from(activeTab === 'saltCave' ? 'salt_cave_reservations' : 'motel_reservations')
        .update({ status: newStatus })
        .eq('id', id);

      if (error) throw error;

      // If status changed to confirmed, send confirmation email
      if (newStatus === 'confirmed' && currentReservation.status !== 'confirmed') {
        try {
          await sendConfirmationEmail(currentReservation);
        } catch (emailError) {} // Ignore email errors
      }

      fetchReservations();
    } catch (err) {
      console.error('Error updating status:', err);
      setError('Nie można zaktualizować statusu. Spróbuj ponownie później.');
    }
  };

  const handleDelete = async (id: string) => {
    try {
      const { error } = await supabase
        .from(activeTab === 'saltCave' ? 'salt_cave_reservations' : 'motel_reservations')
        .delete()
        .eq('id', id);

      if (error) throw error;

      setDeleteConfirmId(null);
      fetchReservations();
    } catch (err) {
      console.error('Error deleting reservation:', err);
      setError('Nie można usunąć rezerwacji. Spróbuj ponownie później.');
    }
  };

  const handleEditContent = (content: SiteContent) => {
    setEditingContentId(content.id);
    setEditingContent(content);
  };

  const handleSaveContent = async () => {
    if (!editingContentId || !editingContent) return;

    try {
      const { error } = await supabase
        .from('site_content')
        .update({
          title: editingContent.title,
          content: editingContent.content,
          content_type: editingContent.content_type,
          updated_by: user?.id
        })
        .eq('id', editingContentId);

      if (error) throw error;

      setEditingContentId(null);
      setEditingContent({});
      fetchSiteContent();
    } catch (err) {
      console.error('Error updating content:', err);
      setError('Nie można zaktualizować treści.');
    }
  };

  const handleCancelEdit = () => {
    setEditingContentId(null);
    setEditingContent({});
  };

  const renderDashboard = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {stats.map((stat, index) => (
          <div key={stat.type} className="bg-white p-6 rounded-lg shadow-lg">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">
                {stat.type === 'salt_cave' ? 'Grota Solna' : 'Pensjonat'}
              </h3>
              <div className="text-2xl">
                {stat.type === 'salt_cave' ? '🧂' : '🏨'}
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div className="bg-gray-50 p-3 rounded">
                <div className="text-gray-600">Łącznie</div>
                <div className="text-2xl font-bold">{stat.total_reservations}</div>
              </div>
              <div className="bg-green-50 p-3 rounded">
                <div className="text-green-600">Potwierdzone</div>
                <div className="text-2xl font-bold text-green-700">{stat.confirmed_reservations}</div>
              </div>
              <div className="bg-yellow-50 p-3 rounded">
                <div className="text-yellow-600">Oczekujące</div>
                <div className="text-2xl font-bold text-yellow-700">{stat.pending_reservations}</div>
              </div>
              <div className="bg-red-50 p-3 rounded">
                <div className="text-red-600">Anulowane</div>
                <div className="text-2xl font-bold text-red-700">{stat.cancelled_reservations}</div>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <h3 className="text-lg font-semibold mb-4">Szybkie akcje</h3>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <button
            onClick={() => setActiveTab('saltCave')}
            className="flex items-center space-x-2 p-3 bg-primary text-white rounded-lg hover:bg-primary-hover transition-colors"
          >
            <Clock size={20} />
            <span>Grota Solna</span>
          </button>
          <button
            onClick={() => setActiveTab('motel')}
            className="flex items-center space-x-2 p-3 bg-secondary text-white rounded-lg hover:bg-secondary-hover transition-colors"
          >
            <Hotel size={20} />
            <span>Pensjonat</span>
          </button>
          <button
            onClick={() => setActiveTab('content')}
            className="flex items-center space-x-2 p-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
          >
            <FileText size={20} />
            <span>Treść strony</span>
          </button>
          <button
            onClick={() => setActiveTab('images')}
            className="flex items-center space-x-2 p-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
          >
            <Image size={20} />
            <span>Zdjęcia</span>
          </button>
        </div>
      </div>
    </div>
  );

  const renderContentManagement = () => (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-semibold">Zarządzanie treścią strony</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Sekcja
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Tytuł
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Treść
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Typ
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Akcje
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {siteContent.map((content) => (
                <tr key={content.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {content.section}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {editingContentId === content.id ? (
                      <input
                        type="text"
                        value={editingContent.title || ''}
                        onChange={(e) => setEditingContent({...editingContent, title: e.target.value})}
                        className="w-full px-3 py-1 border rounded focus:ring-2 focus:ring-primary"
                      />
                    ) : (
                      content.title
                    )}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-900">
                    {editingContentId === content.id ? (
                      <textarea
                        value={editingContent.content || ''}
                        onChange={(e) => setEditingContent({...editingContent, content: e.target.value})}
                        className="w-full px-3 py-1 border rounded focus:ring-2 focus:ring-primary"
                        rows={3}
                      />
                    ) : (
                      <div className="max-w-xs truncate">{content.content}</div>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {editingContentId === content.id ? (
                      <select
                        value={editingContent.content_type || 'text'}
                        onChange={(e) => setEditingContent({...editingContent, content_type: e.target.value as 'text' | 'html' | 'markdown'})}
                        className="px-3 py-1 border rounded focus:ring-2 focus:ring-primary"
                      >
                        <option value="text">Tekst</option>
                        <option value="html">HTML</option>
                        <option value="markdown">Markdown</option>
                      </select>
                    ) : (
                      content.content_type
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 text-xs rounded-full ${
                      content.is_active ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                    }`}>
                      {content.is_active ? 'Aktywna' : 'Nieaktywna'}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    {editingContentId === content.id ? (
                      <div className="flex space-x-2">
                        <button
                          onClick={handleSaveContent}
                          className="text-green-600 hover:text-green-900"
                        >
                          <Save size={16} />
                        </button>
                        <button
                          onClick={handleCancelEdit}
                          className="text-red-600 hover:text-red-900"
                        >
                          <X size={16} />
                        </button>
                      </div>
                    ) : (
                      <button
                        onClick={() => handleEditContent(content)}
                        className="text-primary hover:text-primary-hover"
                      >
                        <Edit size={16} />
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  const renderImageManagement = () => (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-semibold">Zarządzanie zdjęciami</h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
          {siteImages.map((image) => (
            <div key={image.id} className="bg-gray-50 rounded-lg overflow-hidden">
              <div className="aspect-video bg-gray-200 flex items-center justify-center">
                <img
                  src={image.file_path}
                  alt={image.alt_text}
                  className="w-full h-full object-cover"
                                     onError={(e) => {
                     const currentImg = e.currentTarget as HTMLImageElement;
                     const nextElement = currentImg.nextElementSibling as HTMLElement;
                     currentImg.style.display = 'none';
                     if (nextElement) nextElement.style.display = 'flex';
                   }}
                />
                <div className="hidden items-center justify-center h-full text-gray-500">
                  <Image size={48} />
                </div>
              </div>
              <div className="p-4">
                <h4 className="font-medium text-gray-900">{image.title}</h4>
                <p className="text-sm text-gray-600 mt-1">{image.section}</p>
                <p className="text-xs text-gray-500 mt-2">{image.file_path}</p>
                <div className="mt-3 flex justify-between items-center">
                  <span className={`px-2 py-1 text-xs rounded-full ${
                    image.is_active ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                  }`}>
                    {image.is_active ? 'Aktywna' : 'Nieaktywna'}
                  </span>
                  <button className="text-primary hover:text-primary-hover">
                    <Edit size={16} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-100 pt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header with Sign Out */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-900">Panel Administracyjny</h1>
          <button
            onClick={handleSignOut}
            className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
          >
            Wyloguj się
          </button>
        </div>

        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          {/* Header */}
          <div className="border-b border-gray-200">
            <div className="flex flex-wrap">
              <button
                onClick={() => setActiveTab('dashboard')}
                className={`px-6 py-4 text-sm font-medium ${
                  activeTab === 'dashboard'
                    ? 'bg-blue-600 text-white'
                    : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'
                }`}
              >
                <div className="flex items-center space-x-2">
                  <BarChart3 size={20} />
                  <span>Dashboard</span>
                </div>
              </button>
              <button
                onClick={() => setActiveTab('saltCave')}
                className={`px-6 py-4 text-sm font-medium ${
                  activeTab === 'saltCave'
                    ? 'bg-primary text-white'
                    : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'
                }`}
              >
                <div className="flex items-center space-x-2">
                  <Clock size={20} />
                  <span>Grota Solna</span>
                </div>
              </button>
              <button
                onClick={() => setActiveTab('motel')}
                className={`px-6 py-4 text-sm font-medium ${
                  activeTab === 'motel'
                    ? 'bg-secondary text-white'
                    : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'
                }`}
              >
                <div className="flex items-center space-x-2">
                  <Hotel size={20} />
                  <span>Pensjonat</span>
                </div>
              </button>
              <button
                onClick={() => setActiveTab('content')}
                className={`px-6 py-4 text-sm font-medium ${
                  activeTab === 'content'
                    ? 'bg-green-600 text-white'
                    : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'
                }`}
              >
                <div className="flex items-center space-x-2">
                  <FileText size={20} />
                  <span>Treść</span>
                </div>
              </button>
              <button
                onClick={() => setActiveTab('images')}
                className={`px-6 py-4 text-sm font-medium ${
                  activeTab === 'images'
                    ? 'bg-purple-600 text-white'
                    : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'
                }`}
              >
                <div className="flex items-center space-x-2">
                  <Image size={20} />
                  <span>Zdjęcia</span>
                </div>
              </button>
            </div>
          </div>

          {/* Content */}
          <div className="p-6 space-y-6">
            {error && (
              <div className="bg-red-50 text-red-700 p-4 rounded-lg">
                {error}
              </div>
            )}

            {activeTab === 'dashboard' && renderDashboard()}
            {activeTab === 'content' && renderContentManagement()}
            {activeTab === 'images' && renderImageManagement()}

            {(activeTab === 'saltCave' || activeTab === 'motel') && (
              <>
                {/* Search and Filter Bar */}
                <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
                  <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                    <input
                      type="text"
                      placeholder="Szukaj po nazwie, email lub telefonie..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary"
                    />
                  </div>
                  <div className="flex gap-4">
                    <div className="relative">
                      <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                      <select
                        value={statusFilter}
                        onChange={(e) => setStatusFilter(e.target.value as typeof STATUSES[number] | 'all')}
                        className="pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary appearance-none bg-white"
                      >
                        <option value="all">Wszystkie statusy</option>
                        <option value="pending">Oczekujące</option>
                        <option value="confirmed">Potwierdzone</option>
                        <option value="cancelled">Anulowane</option>
                      </select>
                    </div>
                  </div>
                </div>

                {/* Reservations Table */}
                <div className="overflow-x-auto">
                  <table className="min-w-full bg-white rounded-lg shadow-lg">
                    <thead>
                      <tr className="bg-gray-50 border-b">
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                            onClick={() => handleSort('created_at')}>
                          <div className="flex items-center gap-2">
                            Data utworzenia
                            {sortField === 'created_at' && (
                              sortDirection === 'asc' ? <ChevronUp size={16} /> : <ChevronDown size={16} />
                            )}
                          </div>
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                            onClick={() => handleSort('customer_name')}>
                          <div className="flex items-center gap-2">
                            Klient
                            {sortField === 'customer_name' && (
                              sortDirection === 'asc' ? <ChevronUp size={16} /> : <ChevronDown size={16} />
                            )}
                          </div>
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Kontakt
                        </th>
                        {activeTab === 'saltCave' ? (
                          <>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Data i godzina
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Rodzaj biletu
                            </th>
                          </>
                        ) : (
                          <>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Check-in / Check-out
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Typ pokoju
                            </th>
                          </>
                        )}
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Status
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Akcje
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {loading ? (
                        <tr>
                          <td colSpan={7} className="px-6 py-4 text-center text-gray-500">
                            <div className="flex items-center justify-center space-x-2">
                              <div className="w-4 h-4 rounded-full bg-primary animate-ping"></div>
                              <span>Ładowanie...</span>
                            </div>
                          </td>
                        </tr>
                      ) : filteredAndSortedReservations.length === 0 ? (
                        <tr>
                          <td colSpan={7} className="px-6 py-4 text-center text-gray-500">
                            Brak rezerwacji
                          </td>
                        </tr>
                      ) : (
                        filteredAndSortedReservations.map((reservation) => (
                          <tr key={reservation.id} className="hover:bg-gray-50">
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                              {format(new Date(reservation.created_at), 'dd.MM.yyyy HH:mm')}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="text-sm font-medium text-gray-900">
                                {reservation.customer_name}
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="text-sm text-gray-900">{reservation.customer_email}</div>
                              <div className="text-sm text-gray-500">{reservation.customer_phone}</div>
                            </td>
                            {activeTab === 'saltCave' ? (
                              <>
                                                                 <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                   {(reservation as SaltCaveReservation).date ? format(new Date((reservation as SaltCaveReservation).date), 'dd.MM.yyyy') : 'N/A'}{' '}
                                   {formatTime((reservation as SaltCaveReservation).time)}
                                 </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                  {(reservation as SaltCaveReservation).ticket_type}
                                </td>
                              </>
                            ) : (
                              <>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                  {(reservation as MotelReservation).check_in ? format(new Date((reservation as MotelReservation).check_in), 'dd.MM.yyyy') : 'N/A'} -{' '}
                                  {(reservation as MotelReservation).check_out ? format(new Date((reservation as MotelReservation).check_out), 'dd.MM.yyyy') : 'N/A'}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                  {(reservation as MotelReservation).room_type}
                                </td>
                              </>
                            )}
                            <td className="px-6 py-4 whitespace-nowrap">
                              <select
                                value={reservation.status}
                                onChange={(e) => handleStatusChange(reservation.id, e.target.value as typeof STATUSES[number])}
                                className={`text-sm rounded-full px-3 py-1 font-medium ${
                                  reservation.status === 'confirmed'
                                    ? 'bg-green-100 text-green-800'
                                    : reservation.status === 'cancelled'
                                    ? 'bg-red-100 text-red-800'
                                    : 'bg-yellow-100 text-yellow-800'
                                }`}
                              >
                                <option value="pending">Oczekująca</option>
                                <option value="confirmed">Potwierdzona</option>
                                <option value="cancelled">Anulowana</option>
                              </select>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              {deleteConfirmId === reservation.id ? (
                                <div className="flex items-center space-x-2">
                                  <button
                                    onClick={() => handleDelete(reservation.id)}
                                    className="text-xs bg-red-600 text-white px-2 py-1 rounded hover:bg-red-700 transition-colors"
                                  >
                                    Potwierdź
                                  </button>
                                  <button
                                    onClick={() => setDeleteConfirmId(null)}
                                    className="text-xs bg-gray-500 text-white px-2 py-1 rounded hover:bg-gray-600 transition-colors"
                                  >
                                    Anuluj
                                  </button>
                                </div>
                              ) : (
                                <button
                                  onClick={() => setDeleteConfirmId(reservation.id)}
                                  className="text-xs text-red-600 hover:text-red-800 transition-colors"
                                >
                                  Usuń
                                </button>
                              )}
                            </td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Admin;