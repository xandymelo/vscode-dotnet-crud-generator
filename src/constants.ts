export enum workSpaceStateNames {
    generateService = 'generateService',
    generateModels = 'generateModels',
    generateController = 'generateController'
}

export const defaultModelContent = `using System.Collections.Generic;
        namespace YourNamespace
        {
            public class YourClass
            {
            }
        }`;

export const defaultServiceContent = `using ComidaInvisivel.Plataforma.Services.Models;
using ComidaInvisivel.Plataforma.Services.Repository;
using System.Threading.Tasks;
using System.Text;

namespace ComidaInvisivel.Plataforma.Services
{
    public class [YourClass]Service : BaseService<$EntityName>
    {
        public LogService LogService { get; }

        public [YourClass]Service(IRepository repository, LogService logService) : base(repository)
        {
            LogService = logService;
        }

        public override Task<[YourClass]> UpdateAsync($EntityName entity)
        {
            throw new System.NotImplementedException();
        }

        public async Task<[YourClass]> UpdateWithLogAsync($EntityName entity, int userId)
        {
            var sbObservacao = new StringBuilder();
            var [YourClassLower] = await GetByIdAsync(entity.Id);
            await LogService.AdminLogAsync(
                userId: userId,
                acao: LogService.ACAO_EDITAR_[YourClassUpper],
                model: new {
                    
                },
                observacao: sbObservacao.ToString(),
                tipoOperacional: TipoOperacional...,
                perfilId: entity.Id
            );
            return entity;
        }
    }
}`;
export const defaultControllerContent = `using System;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using ComidaInvisivel.Plataforma.Services;
using ComidaInvisivel.Plataforma.API.Models;
using System.Collections.Generic;
using System.Linq;

namespace $namespace
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class [YourClass]Controller : ControllerBase
    {
        private readonly [YourClass]Service _[YourClass]Service;
        private IMapper Mapper { get; }
        public LogService LogService { get; }

        public [YourClass]Controller([YourClass]Service [YourClassLower]Service, IMapper mapper, LogService logService)
        {
            _[YourClass]Service = [YourClassLower]Service;
            Mapper = mapper;
            LogService = logService;
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> Get(int id)
        {
            var item = await _[YourClass]Service.GetByIdAsync(id);
            if (item == null)
            {
                return NotFound();
            }
            return Ok(item);
        }

        [HttpPost]
        public async Task<IActionResult> Create(Create[YourClass]Model item)
        {
            var entity = await _[YourClass]Service.AddAsync(Mapper.Map<[YourClass]>(item));
            await LogService.AdminLogAsync(
                User.GetUserId(),
                LogService.ACTION_CREATE_[YourCLassUpper],
                Mapper.Map<[YourClass]Model>(entity),
                \`[YourClass] criado pelo usuário \${User.GetUserId()}\`,
                entity.Id
            );
            return Ok(Mapper.Map<[YourClass]Model>(entity));
        }

        [HttpPost("range")]
        public async Task<IActionResult> CreateRange(List<[YourClass]Model> itens)
        {
            var entities = await _[YourClass]Service.AddRangeAsync(Mapper.Map<List<[YourClass]>>(itens));
            var tasks = new List<Task>();
            entities.forEach(entity => {
                var task = LogService.AdminLogAsync(
                    User.GetUserId(),
                    LogService.ACAO_CRIAR_[YourClassUpper],
                    Mapper.Map<OngAvaliacaoModel>(entity),
                    \`[YourClass] criada pelo usuário \`,
                    entity.Id
                );
                tasks.push(task);
            });
            await Promise.all(tasks);
            return Ok(Mapper.Map<List<[YourClass]Model>>(entities));
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Update(Update[YourClass]Model model)
        {
            var existingItem = await _[YourClass]Service.GetByIdAsync(model.Id);
            if (existingItem == null)
            {
                return NotFound();
            }
            await _[YourClass]Service.UpdateWithLogAsync(Mapper.Map<[YourClass]>(model), User.GetUserId());
            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            var item = await _[YourClass]Service.GetByIdAsync(id);
            if (item == null)
            {
                return NotFound();
            }
            await _[YourClass]Service.DeleteAsync(id);
            await LogService.AdminLogAsync(
                User.GetUserId(),
                LogService.ACAO_DELETAR_[YourClassUpper],
                Mapper.Map<[YourClass]Model>(item),
                \`[YourClass] deletado pelo usuário \`,
                id
            );
            return NoContent();
        }
    }
}`;