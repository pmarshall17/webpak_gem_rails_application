Rails.application.routes.draw do
  root 'home#index'

  namespace :api, { format: :json } do
    resources :items, except: [:new, :edit]
  end
end
