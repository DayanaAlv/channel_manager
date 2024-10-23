const guestsRouter = requiere ('express').Router();
const {Guest} = requiere ('../models/index');

// lista completa 
guestsRouter.get('/', (req, res,next) => {
    Guest.find({})
    .then(guest => {
        res.json(guest);
    })
   
})

// lista por id 
guestsRouter.get('/:id' ,(req, res, next) => {
    Guest.findById(req.params.id)
     .then (existinGuest => {
        if (existinGuestguest) {
            res.json(existinGuest);
        } else {
            res.status(404).end()
        }
     })
     .catch(error => next(error));
})

// agregar a la lista 
 guestsRouter.post('/' , (req,res, next) => {
    const body = req.body

    const guest = new Guest ({
        firstName: body.firstName,
        lastName: body.lastName,
        email: body.email,
        phone: body.phone ||  undefined,
        nationality: body.nationality || undefined,
        documentType: body.documentType,
        documentNumber: body.documentNumber,
        address: body.address,
        preferences: body.preferences,
        blacklisted: body.blacklisted || false,
        blacklistReason: body.blacklistReason || null
    });
    guest.save()
     .then(savedGuest => {
        res.status(201).json(savedGuest);
     })
     .catch(error => next(error));
 });

 guestsRouter.put('/id',(req,res,next) => {
    const body = req.body;

    Guest.findById(req, params.id)
     .then((existinGuest) => {
        if (!existinGuest) {
            return res.status(404).end();
        }
     const updatedAddress = {
        street: bidy.address?.street || existinGuest.address.street,
        city: body.address?.city  || existinGuest.address.city,
        state: body.address?.state  || existinGuest.address.state,
        country: body.address?.country  || existinGuest.country,
        postalcode: body.address?.country  || existinGuest.address.postalcode,
     }

    const guest = {
    firstName: existinGuest.firstName,
    lastName: existinGuest.lastName,
    email: body.email,
    phone: body.phone,
    nationality: existinGuest.nationality,
    documentType: existinGuest.documentType,
    documentNumber: existinGuest.documentNumber,
    address: updatedAddress,
    preferences: body.preferences ? new Map(body.preferences):existinGuest.preferences,
    blacklisted: existinGuest.blacklisted,
    blacklistReason: existinGuest.blacklistReason

    }
   
     return Guest.findByIdAndUpdate(req.params.id, guest, { new: true })
    .then((updatedGuest) => {
      res.json(updatedGuest);
    })
    .catch(error => next(error));
})
 });

 guestsRouter.delete('/:id', (req, res, next) => {
    Guest.findByIdAndRemove(req.params.id)
      .then(() => {
        res.status(204).end();
      })
      .catch(error => next(error));
  });



