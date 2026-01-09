import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { mockEvents } from '../data/mockEvents';

const useStore = create(
  persist(
    (set, get) => ({
      // User data
      user: {
        name: 'Guest',
        interests: [],
        location: 'Kuala Lumpur, Malaysia',
      },

      // Events
      allEvents: mockEvents,
      currentEventIndex: 0,
      savedEvents: [],
      skippedEvents: [],

      // Filters
      filters: {
        categories: [],
        dateRange: 'all', // all, today, week, month
        priceRange: 'all', // all, free, paid
        distance: 50, // in miles
      },

      // UI state
      showEventModal: false,
      selectedEvent: null,

      // Actions
      setUser: (userData) => set({ user: { ...get().user, ...userData } }),

      swipeRight: (eventId) => {
        const state = get();
        const event = state.allEvents.find(e => e.id === eventId);

        // Prevent double processing
        if (state.skippedEvents.includes(eventId) || state.savedEvents.find(e => e.id === eventId)) {
          console.log('Event already processed:', eventId);
          return;
        }

        if (event) {
          set(state => ({
            savedEvents: [...state.savedEvents, event],
            currentEventIndex: state.currentEventIndex + 1,
          }));
        }
      },

      swipeLeft: (eventId) => {
        const state = get();

        // Prevent double processing
        if (state.skippedEvents.includes(eventId) || state.savedEvents.find(e => e.id === eventId)) {
          console.log('Event already processed:', eventId);
          return;
        }

        set(state => ({
          skippedEvents: [...state.skippedEvents, eventId],
          currentEventIndex: state.currentEventIndex + 1,
        }));
      },

      unsaveEvent: (eventId) => {
        set(state => ({
          savedEvents: state.savedEvents.filter(e => e.id !== eventId),
        }));
      },

      setFilters: (newFilters) => {
        set(state => ({
          filters: { ...state.filters, ...newFilters },
          currentEventIndex: 0, // Reset to first event when filters change
        }));
      },

      resetSwipes: () => {
        set({
          currentEventIndex: 0,
          skippedEvents: [],
        });
      },

      openEventModal: (event) => {
        set({
          showEventModal: true,
          selectedEvent: event,
        });
      },

      closeEventModal: () => {
        set({
          showEventModal: false,
          selectedEvent: null,
        });
      },

      // Get filtered events
      getFilteredEvents: () => {
        const { allEvents, filters, skippedEvents, savedEvents } = get();

        return allEvents.filter(event => {
          // Don't show already swiped events
          if (skippedEvents.includes(event.id)) return false;
          if (savedEvents.find(e => e.id === event.id)) return false;

          // Category filter
          if (filters.categories.length > 0) {
            const hasCategory = event.tags.some(tag =>
              filters.categories.includes(tag)
            );
            if (!hasCategory) return false;
          }

          // Price filter
          if (filters.priceRange === 'free' && event.price !== 'Free') return false;
          if (filters.priceRange === 'paid' && event.price === 'Free') return false;

          // Date filter
          const eventDate = new Date(event.date);
          const now = new Date();
          const daysDiff = Math.ceil((eventDate - now) / (1000 * 60 * 60 * 24));

          if (filters.dateRange === 'today' && daysDiff !== 0) return false;
          if (filters.dateRange === 'week' && daysDiff > 7) return false;
          if (filters.dateRange === 'month' && daysDiff > 30) return false;

          return true;
        });
      },
    }),
    {
      name: 'eventswipe-storage',
      partialize: (state) => ({
        user: state.user,
        savedEvents: state.savedEvents,
        skippedEvents: state.skippedEvents,
      }),
    }
  )
);

export default useStore;
