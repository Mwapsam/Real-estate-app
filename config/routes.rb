Rails.application.routes.draw do
  devise_for :users
  get 'homepage/index'
  namespace :api do
    namespace :v1 do
      resources :listings
      resources :bookings
      resources :reviews
    end
  end

  root "homepage#index"
end
