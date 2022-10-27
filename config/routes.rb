Rails.application.routes.draw do
  devise_for :users
  get 'homepage/index'
  namespace :api do
    namespace :v1 do
      resources :listings
    end
  end

  root "homepage#index"
end
